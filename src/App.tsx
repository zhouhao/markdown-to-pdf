import { useState, useCallback, useEffect, useMemo } from 'react';
import AppHeader from './components/AppHeader';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';
import FullscreenPreview from './components/FullscreenPreview';
import { exportToPdf } from './utils/pdf';
import { sampleMarkdown } from './data/sampleMarkdown';
import './styles/markdown.css';
import './styles/print.css';

// Document type
interface Doc { id: string; name: string; content: string; updatedAt: number }

const DOCS_KEY = 'mdtp_docs';
const CURRENT_ID_KEY = 'mdtp_currentDocId';
const LEGACY_KEY = 'mdtp_markdownContent';

function safeParse<T>(json: string | null, fallback: T): T {
  if (!json) return fallback;
  try { return JSON.parse(json) as T; } catch { return fallback; }
}

function createId() {
  return 'doc_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function App() {
  // Initialize docs and currentDocId with migration from legacy single-doc key
  const [docs, setDocs] = useState<Doc[]>(() => {
    try {
      const existing = safeParse<Doc[]>(localStorage.getItem(DOCS_KEY), []);
      if (existing && Array.isArray(existing) && existing.length > 0) {
        return existing;
      }
      const legacy = localStorage.getItem(LEGACY_KEY);
      const initialContent = legacy !== null ? legacy : sampleMarkdown;
      const initialDoc: Doc = {
        id: createId(),
        name: 'Untitled',
        content: initialContent,
        updatedAt: Date.now(),
      };
      const seed = [initialDoc];
      try {
        localStorage.setItem(DOCS_KEY, JSON.stringify(seed));
        localStorage.setItem(CURRENT_ID_KEY, initialDoc.id);
        if (legacy !== null) localStorage.removeItem(LEGACY_KEY);
      } catch {}
      return seed;
    } catch {
      // storage unavailable; fallback to in-memory single doc
      return [{ id: createId(), name: 'Untitled', content: sampleMarkdown, updatedAt: Date.now() }];
    }
  });
  const [currentDocId, setCurrentDocId] = useState<string>(() => {
    try {
      const id = localStorage.getItem(CURRENT_ID_KEY);
      if (id) return id;
      const existing = safeParse<Doc[]>(localStorage.getItem(DOCS_KEY), []);
      return existing[0]?.id || '';
    } catch {
      return '';
    }
  });

  // Persist docs and current id when they change
  useEffect(() => {
    try {
      localStorage.setItem(DOCS_KEY, JSON.stringify(docs));
    } catch {}
  }, [docs]);

  useEffect(() => {
    try {
      if (currentDocId) localStorage.setItem(CURRENT_ID_KEY, currentDocId);
    } catch {}
  }, [currentDocId]);

  const activeDoc = useMemo(() => docs.find(d => d.id === currentDocId) || docs[0], [docs, currentDocId]);
  const markdownContent = activeDoc?.content ?? '';

  const setMarkdownContent = useCallback((value: string) => {
    setDocs(prev => {
      const now = Date.now();
      return prev.map(d => d.id === (activeDoc?.id || currentDocId) ? { ...d, content: value, updatedAt: now } : d);
    });
  }, [activeDoc?.id, currentDocId]);

  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const handleLoadSample = useCallback(() => {
    setMarkdownContent(sampleMarkdown);
  }, [setMarkdownContent]);

  const handleExportPdf = useCallback(async () => {
    setIsExporting(true);
    try {
      const previewElement = document.getElementById('preview-content');
      if (previewElement) {
        await exportToPdf(previewElement, activeDoc?.name ? `${activeDoc.name}.pdf` : 'markdown-document');
      }
    } catch (error) {
      console.error('导出 PDF 失败:', error);
      alert('导出 PDF 失败，请重试。');
    } finally {
      setIsExporting(false);
    }
  }, [activeDoc?.name]);

  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  const handleExitFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  // ESC 键Exit全屏
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        handleExitFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, handleExitFullscreen]);

  // Doc management handlers
  const handleSwitchDoc = useCallback((id: string) => {
    setCurrentDocId(id);
  }, []);

  const handleNewDoc = useCallback(() => {
    const name = (prompt('New document name', 'Untitled') || '').trim() || 'Untitled';
    const newDoc: Doc = { id: createId(), name, content: '', updatedAt: Date.now() };
    setDocs(prev => [newDoc, ...prev]);
    setCurrentDocId(newDoc.id);
  }, []);


  const handleDeleteDoc = useCallback(() => {
    if (docs.length <= 1 || !activeDoc) {
      alert('Cannot delete the last document.');
      return;
    }
    if (!confirm(`Delete "${activeDoc.name}"? This cannot be undone.`)) return;
    setDocs(prev => prev.filter(d => d.id !== activeDoc.id));
    // switch to another doc (the first remaining)
    const remaining = docs.filter(d => d.id !== activeDoc.id);
    const nextId = remaining[0]?.id;
    if (nextId) setCurrentDocId(nextId);
  }, [docs, activeDoc]);

  if (isFullscreen) {
    return (
      <FullscreenPreview 
        markdownContent={markdownContent}
        onExit={handleExitFullscreen}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <AppHeader 
        onLoadSample={handleLoadSample}
        onExportPdf={handleExportPdf}
        onToggleFullscreen={handleToggleFullscreen}
        isExporting={isExporting}
        docs={docs.map(d => ({ id: d.id, name: d.name }))}
        currentDocId={activeDoc?.id || ''}
        onSwitchDoc={handleSwitchDoc}
        onNewDoc={handleNewDoc}
        onDeleteDoc={handleDeleteDoc}
      />
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full max-w-[2400px] mx-auto px-3 py-6">
          <div className="grid grid-cols-2 gap-4 h-full">
            <EditorPanel 
              value={markdownContent}
              onChange={setMarkdownContent}
            />
            <PreviewPanel markdownContent={markdownContent} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
