import {PolicyPage} from './index';
import './markdown-style.module.css'
import { markdown } from './content';
import ReactMarkdown from 'react-markdown';

 export default {
    title: 'pages/PolicyPage',
    component: PolicyPage,

 };

 const Template = () => <ReactMarkdown children={markdown}/>

 export const Default = Template.bind({})


