import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { markdown } from './content';

export function PolicyPage() {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>;
}
