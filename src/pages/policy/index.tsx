import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { markdown } from './content';
import style from './markdown-style.module.css';

export function PolicyPage() {
  return (
    <ReactMarkdown className={style.markdownStyles} remarkPlugins={[remarkGfm]}>
      {markdown}
    </ReactMarkdown>
  );
}
