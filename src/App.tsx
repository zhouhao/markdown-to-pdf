import { useState, useCallback, useEffect } from 'react';
import AppHeader from './components/AppHeader';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';
import FullscreenPreview from './components/FullscreenPreview';
import { exportToPdf } from './utils/pdf';
import { sampleMarkdown } from './data/sampleMarkdown';
import './styles/markdown.css';
import './styles/print.css';

function App() {
  const [markdownContent, setMarkdownContent] = useState<string>(sampleMarkdown);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const handleLoadSample = useCallback(() => {
    setMarkdownContent(sampleMarkdown);
  }, []);

  const handleExportPdf = useCallback(async () => {
    setIsExporting(true);
    try {
      const previewElement = document.getElementById('preview-content');
      if (previewElement) {
        await exportToPdf(previewElement, 'markdown-document');
      }
    } catch (error) {
      console.error('导出 PDF 失败:', error);
      alert('导出 PDF 失败，请重试。');
    } finally {
      setIsExporting(false);
    }
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  const handleExitFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  // ESC 键退出全屏
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        handleExitFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, handleExitFullscreen]);

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
