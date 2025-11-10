export const sampleMarkdown = `# Markdown to PDF — Quick Start Guide

Welcome to a simple, fast Markdown → PDF tool!

## Key Features

This tool offers:

- Live preview of rendered Markdown
- Full Markdown syntax support
- Code syntax highlighting
- One‑click export to a polished PDF

## Markdown Syntax Examples

### 1. Text formatting

This is a normal paragraph. You can use **bold** and *italic* to emphasize text.

You can also use ~~strikethrough~~ and \`inline code\`.

### 2. Lists

#### Unordered list

- First item
- Second item
  - Nested item 2.1
  - Nested item 2.2
- Third item

#### Ordered list

1. Do this first
2. Then do that
3. Finally wrap it up

### 3. Links and images

[Visit GitHub](https://github.com)

### 4. Blockquote

> This is a quote.
>
> Blockquotes can span multiple paragraphs.

### 5. Table

| Feature | Support | Notes |
|--------|---------|-------|
| Headings | ✓ | H1–H6 supported |
| Lists | ✓ | Ordered and unordered |
| Code | ✓ | Syntax highlighting |
| Table | ✓ | Full support |

### 6. Code blocks

#### JavaScript example

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return true;
}

const user = 'World';
greet(user);
\`\`\`

#### Python example

\`\`\`python
def fibonacci(n):
    """Compute the Fibonacci sequence"""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Print the first 10 Fibonacci numbers
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
\`\`\`

#### TypeScript example

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

class UserService {
  private users: User[] = [];
  
  addUser(user: User): void {
    this.users.push(user);
  }
  
  getUser(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }
}
\`\`\`

### 7. Mermaid diagram

\`\`\`mermaid
graph TD
  A[Start] --> B{Is it working?}
  B -- Yes --> C[Great]
  B -- No --> D[Fix it]
  D --> B
\`\`\`

### 8. Callouts (GitHub-style)

> [!NOTE] Quick note
> This is an informational note.   
> It can span multiple paragraphs.

> [!TIP]
> Tips highlight best practices or shortcuts.

> [!WARNING] Be careful
> Warnings draw attention to potential pitfalls.

> [!ERROR]
> Errors indicate something went wrong.

## Tips

1. **Live preview**: Type in the editor on the left; the right side updates instantly.
2. **Export PDF**: Click the “Export to PDF” button in the top-right to download.
3. **Syntax highlighting**: Code blocks are automatically highlighted for many languages.
4. **Customize**: Clear the editor and paste or write your own Markdown.

---

Note: The exported PDF preserves formatting and code highlighting colors — great for sharing and printing.
`;
