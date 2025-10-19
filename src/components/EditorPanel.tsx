import React from 'react';

interface EditorPanelProps {
  value: string;
  onChange: (value: string) => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-700 flex items-center">
          <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Editor
        </h2>
      </div>
      <div className="flex-1 p-6">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full resize-none border-none outline-none font-mono text-sm text-gray-800 leading-relaxed"
          placeholder="在此输入 Markdown 内容..."
          spellCheck={false}
          style={{ minHeight: '100%' }}
        />
      </div>
    </div>
  );
};

export default EditorPanel;
