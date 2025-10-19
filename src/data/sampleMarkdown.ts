export const sampleMarkdown = `# Markdown 转 PDF 工具使用指南

欢迎使用这个简洁高效的 Markdown 转 PDF 工具！

## 主要功能

这个工具提供以下核心功能：

- 实时预览 Markdown 渲染效果
- 支持完整的 Markdown 语法
- 代码语法高亮显示
- 一键导出为精美的 PDF 文档

## Markdown 语法示例

### 1. 文本格式

这是一段普通文本。你可以使用 **粗体** 和 *斜体* 来强调内容。

你也可以使用 ~~删除线~~ 和 \`行内代码\`。

### 2. 列表

#### 无序列表

- 第一项
- 第二项
  - 嵌套项 2.1
  - 嵌套项 2.2
- 第三项

#### 有序列表

1. 首先做这个
2. 然后做那个
3. 最后完成这个

### 3. 链接和图片

[访问 GitHub](https://github.com)

### 4. 引用

> 这是一段引用文本。
> 
> 引用可以包含多个段落。

### 5. 表格

| 特性 | 支持情况 | 说明 |
|------|---------|------|
| 标题 | ✓ | 支持 H1-H6 |
| 列表 | ✓ | 有序和无序 |
| 代码 | ✓ | 语法高亮 |
| 表格 | ✓ | 完整支持 |

### 6. 代码块

#### JavaScript 示例

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return true;
}

const user = 'World';
greet(user);
\`\`\`

#### Python 示例

\`\`\`python
def fibonacci(n):
    """计算斐波那契数列"""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# 打印前 10 个斐波那契数
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
\`\`\`

#### TypeScript 示例

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

## 使用技巧

1. **实时预览**：在左侧编辑器中输入内容，右侧会实时显示渲染效果
2. **导出 PDF**：点击右上角的「导出为 PDF」按钮即可下载
3. **代码高亮**：代码块会自动应用语法高亮，支持多种编程语言
4. **自定义内容**：清空编辑器，输入你自己的 Markdown 内容

---

**提示**：导出的 PDF 会保留所有格式和代码高亮颜色，适合用于文档分享和打印。
`;
