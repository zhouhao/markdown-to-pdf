import React, { useEffect, useRef } from 'react';
import { renderMarkdown } from '../utils/markdown';
import 'highlight.js/styles/atom-one-dark.css';

interface PreviewPanelProps {
  markdownContent: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ markdownContent }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewRef.current) {
      const html = renderMarkdown(markdownContent);
      previewRef.current.innerHTML = html;
    }
  }, [markdownContent]);

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-700 flex items-center">
          <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          实时预览
        </h2>
      </div>
      <div className="flex-1 overflow-auto">
        <div 
          id="preview-content"
          ref={previewRef} 
          className="prose prose-sm max-w-none p-6 markdown-preview"
        />
      </div>
    </div>
  );
};

export default PreviewPanel;
