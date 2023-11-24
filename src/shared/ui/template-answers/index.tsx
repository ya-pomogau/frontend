import styles from './styles.module.css';
import classnames from 'classnames';

interface ITemplateAnswers {
  answers: Array<string>;
}

export const TemplateAnswers = ({ answers }: ITemplateAnswers) => {
  return (
    <div className={classnames(styles.answers)}>
      {answers.map((answer, key) => (
        <p
          key={key}
          className={classnames('text', 'text_size_small', styles.answer)}
        >
          {answer}
        </p>
      ))}
    </div>
  );
};
