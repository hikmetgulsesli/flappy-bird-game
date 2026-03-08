import { marked, Renderer } from 'marked';
import hljs from 'highlight.js';
import type { Heading } from '../types.js';

// Custom renderer to add IDs to headings and wrap tables
class CustomRenderer extends Renderer {
  private headings: Heading[] = [];

  getHeadings(): Heading[] {
    return this.headings;
  }

  heading(text: string, level: number): string {
    // Generate ID from text (slugify)
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
    
    this.headings.push({ level, text, id });
    
    return `<h${level} id="${id}">${text}</h${level}>`;
  }

  code(code: string, language?: string): string {
    const validLanguage = language && hljs.getLanguage(language) ? language : 'plaintext';
    const highlighted = hljs.highlight(code, { language: validLanguage }).value;
    
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
