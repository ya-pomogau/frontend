import { PolicyPage } from './index';
import './markdown-style.module.css';
import { markdown } from './content';
import ReactMarkdown from 'react-markdown';

export default {
  title: 'pages/PolicyPage',
  component: PolicyPage,
};

const Template = () => <ReactMarkdown>{markdown}</ReactMarkdown>;

export const Default = Template.bind({});
