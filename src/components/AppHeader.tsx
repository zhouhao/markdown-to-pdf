import React from 'react';

interface DocSummary { id: string; name: string }

interface AppHeaderProps {
  onLoadSample: () => void;
  onExportPdf: () => void;
  onToggleFullscreen: () => void;
  isExporting: boolean;
  // multi-doc props
  docs: DocSummary[];
  currentDocId: string;
  onSwitchDoc: (id: string) => void;
  onNewDoc: () => void;
  onRenameDoc: () => void;
  onDeleteDoc: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onLoadSample, onExportPdf, onToggleFullscreen, isExporting, docs, currentDocId, onSwitchDoc, onNewDoc, onRenameDoc, onDeleteDoc }) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1920px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/logo.svg" alt="Markdown to PDF logo" className="w-8 h-8 rounded-lg shadow-sm" />
            <h1 className="text-xl font-semibold text-gray-800">Markdown to PDF</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Document selector */}
            <div className="flex items-center space-x-2">
              <select
                value={currentDocId}
                onChange={(e) => onSwitchDoc(e.target.value)}
                className="px-2 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-700"
                title="Switch document"
              >
                {docs.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              <button onClick={onNewDoc} className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50" title="New document">New</button>
              <button onClick={onRenameDoc} className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50" title="Rename document">Rename</button>
              <button onClick={onDeleteDoc} className="px-3 py-2 text-sm text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50" title="Delete document">Delete</button>
            </div>

            <button
              onClick={onLoadSample}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Load Sample
            </button>
            <button
              onClick={onToggleFullscreen}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
              title="Fullscreen Preview（打印模式）"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span>Fullscreen Preview</span>
            </button>
            <button
              onClick={onExportPdf}
              disabled={isExporting}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isExporting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>正在生成...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Export to PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
