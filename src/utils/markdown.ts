import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

// Simple HTML escaper for safe embedding of Mermaid definitions
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {
        // ignore
      }
    }
    return ''; // use external default escaping
  }
});

// Render ```mermaid code blocks into <div class="mermaid"> for MermaidJS
const defaultFence = md.renderer.rules.fence;
md.renderer.rules.fence = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const info = (token.info || '').trim();
  if (info === 'mermaid' || info.startsWith('mermaid ')) {
    const content = token.content || '';
    return `<div class="mermaid">${escapeHtml(content)}</div>`;
  }
  // fallback to default renderer to preserve syntax highlighting
  if (defaultFence) {
    return defaultFence(tokens, idx, options, env, self);
  }
  return self.renderToken(tokens, idx, options);
};

export function renderMarkdown(text: string): string {
  return md.render(text);
}
