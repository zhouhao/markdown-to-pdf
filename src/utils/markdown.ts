import MarkdownIt from 'markdown-it';
import type Token from 'markdown-it/lib/token';
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

// GitHub-style callouts plugin: > [!NOTE] Optional title\n> content
// Supported types: INFO/NOTE, TIP, WARNING/CAUTION, ERROR/DANGER, IMPORTANT (mapped to info)
md.core.ruler.after('block', 'callouts', function (state) {
  const tokens = state.tokens;
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.type !== 'blockquote_open') continue;

    // Find matching close for this blockquote
    let closeIdx = i + 1;
    const openLevel = t.level;
    for (; closeIdx < tokens.length; closeIdx++) {
      if (tokens[closeIdx].type === 'blockquote_close' && tokens[closeIdx].level === openLevel) break;
    }
    if (closeIdx >= tokens.length) continue;

    // Check first paragraph inside blockquote for the [!TYPE] marker (in its first line only)
    const pOpen = tokens[i + 1];
    const inline = tokens[i + 2];
    const pClose = tokens[i + 3];
    if (!pOpen || !inline || !pClose) continue;
    if (pOpen.type !== 'paragraph_open' || inline.type !== 'inline' || pClose.type !== 'paragraph_close') continue;

    const rawInline = inline.content || '';
    const lines = rawInline.split('\n');
    const header = (lines[0] || '').trim();
    const m = header.match(/^\[!\s*(INFO|NOTE|TIP|WARNING|ERROR|IMPORTANT|CAUTION|DANGER)\s*\](?:\s*(.*))?$/i);
    if (!m) continue;

    const typ = m[1].toUpperCase();
    const customTitle = (m[2] || '').trim();

    let variant: 'info' | 'tip' | 'warning' | 'error' = 'info';
    let defaultTitle = 'Note';
    switch (typ) {
      case 'TIP':
        variant = 'tip';
        defaultTitle = 'Tip';
        break;
      case 'WARNING':
      case 'CAUTION':
        variant = 'warning';
        defaultTitle = 'Warning';
        break;
      case 'ERROR':
      case 'DANGER':
        variant = 'error';
        defaultTitle = 'Error';
        break;
      case 'IMPORTANT':
        variant = 'info';
        defaultTitle = 'Important';
        break;
      case 'INFO':
      case 'NOTE':
      default:
        variant = 'info';
        defaultTitle = typ === 'NOTE' ? 'Note' : 'Info';
        break;
    }

    const title = escapeHtml(customTitle || defaultTitle);

    // Prepare wrapper HTML tokens
    const openHtml = new state.Token('html_block', '', 0) as Token;
    openHtml.content = `<div class="callout callout-${variant}"><div class="callout-title">${title}</div><div class="callout-body">`;

    const closeHtml = new state.Token('html_block', '', 0) as Token;
    closeHtml.content = '</div></div>';

    // Replace the blockquote_open with our wrapper open
    tokens.splice(i, 1, openHtml);

    // Remove only the first marker line from the first paragraph's inline content.
    // If nothing remains in that paragraph after removing the marker line (and an optional empty line),
    // drop the whole paragraph tokens; otherwise, keep the paragraph and updated inline content.
    let bodyLines = lines.slice(1);
    if (bodyLines.length && bodyLines[0].trim() === '') {
      bodyLines.shift();
    }
    const remaining = bodyLines.join('\n');
    if (remaining.trim().length > 0) {
      inline.content = remaining;
      // keep pOpen/inline/pClose tokens in place
    } else {
      // Remove the marker paragraph tokens which are now at i+1, i+2, i+3
      tokens.splice(i + 1, 3);
      // Adjust closeIdx since we removed three tokens before it
      closeIdx = closeIdx - 3;
    }

    // Replace the blockquote_close with our closing html
    tokens.splice(closeIdx, 1, closeHtml);

    // Move index to after closeHtml to avoid nested processing issues
    i = closeIdx;
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
