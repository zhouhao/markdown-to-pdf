import React, { useEffect, useRef } from 'react';
import { renderMarkdown } from '../utils/markdown';
import 'highlight.js/styles/atom-one-dark.css';

interface FullscreenPreviewProps {
  markdownContent: string;
  onExit: () => void;
}

const FullscreenPreview: React.FC<FullscreenPreviewProps> = ({ markdownContent, onExit }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewRef.current) {
      const html = renderMarkdown(markdownContent);
      previewRef.current.innerHTML = html;
    }
  }, [markdownContent]);

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      {/* Exit按钮 - 打印时隐藏 */}
      <button
        onClick={onExit}
        className="print:hidden fixed top-6 right-6 z-10 px-4 py-2 bg-gray-800 bg-opacity-80 hover:bg-opacity-100 text-white rounded-lg shadow-lg transition-all duration-200 flex items-center space-x-2"
        title="Exit Full Screen (ESC)"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span>Exit</span>
      </button>

      {/* 预览内容 */}
      <div className="min-h-screen">
        <div 
          id="preview-content"
          ref={previewRef} 
          className="prose prose-sm max-w-none markdown-preview"
        />
      </div>
    </div>
  );
};

export default FullscreenPreview;