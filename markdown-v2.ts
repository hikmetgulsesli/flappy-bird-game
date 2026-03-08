import { marked, Renderer } from 'marked';
import hljs from 'highlight.js';
import type { Heading } from '../types.js';

// Custom renderer to add IDs to headings and wrap tables
class CustomRenderer extends Renderer {
  private headings: Heading[] = [];

  getHeadings(): Heading[] {
    return this.headings;
  }

  heading(text: string | { toString(): string }, level: number): string {
    // Handle case where text might be an object (marked token)
    const textStr = typeof text === 'string' ? text : text.toString();
    
    // Generate ID from text (slugify)
    const id = textStr
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
    
    this.headings.push({ level, text: textStr, id });
    
    return `<h${level} id="${id}">${textStr}</h${level}>`;
  }

  code(code: string | { toString(): string }, language?: string): string {
    // Handle case where code might be an object
    const codeStr = typeof code === 'string' ? code : code.toString();
    const validLanguage = language && hljs.getLanguage(language) ? language : 'plaintext';
    const highlighted = hljs.highlight(codeStr, { language: validLanguage }).value;
    
    return `<pre><code class="hljs language-${validLanguage}">${highlighted}</code></pre>`;
  }

  table(header: string, body: string): string {
    return `<div class="table-wrapper"><table><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
  }
}

export interface RenderResult {
  html: string;
  headings: Heading[];
}

export function renderMarkdown(markdown: string): RenderResult {
  const renderer = new CustomRenderer();
  
  marked.setOptions({
    renderer,
    gfm: true,
    breaks: false,
  });

  const html = marked.parse(markdown) as string;
  const headings = renderer.getHeadings();

  return { html, headings };
}
