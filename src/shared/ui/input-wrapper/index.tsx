import React, { ChangeEvent, useState } from 'react';
import cn from 'classnames';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import styles from './styles.module.css';
import { Icon } from '../icons';
import { Message } from '../message';

interface PropsInputWrapper {
  placeholder: string;
  inputValue: string;
  name: string;
  extClassInput?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickBtn: () => void;
  extClassButton?: string;
  getFile: (value: string) => void;
  containerMessages: boolean;
}

export const InputWrapper: React.FC<PropsInputWrapper> = (props) => {
  const [fileInput, setFileInput] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFileInput(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFile = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      try {
        await getBase64(file);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const hendleDeleteFile = () => {
    setFileInput('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const dataMessage = [
    {
      messageText: 'Здравствуйте, спасибо, что обратились.',
    },
    {
      messageText: 'Будут вопросы — обращайтесь.',
    },
    {
      messageText:
        'Я не могу ответить прямо сейчас, но обязательно вернусь с ответом в течении часа.',
    },
  ];

  return (
    <div className={styles.box}>
      <form className={styles.inputWrapper} onSubmit={handleSubmit}>
        <Input
          placeholder={props.placeholder}
          value={props.inputValue}
          name={props.name}
          extClassName={cn(styles.input, props.extClassInput)}
          onChange={props.onChange}
          customIcon={
            <label>
              <input
                id="input-image"
                type="file"
                className={styles.file}
                accept=".png,.jpg,.jpeg,.gif,.pdf,.doc,image/*"
                onInput={handleFile}
                onChange={handleFileChange}
              />
              <Icon color="blue" icon="PinIcon" />
            </label>
          }
        />
        <Button
          buttonType="primary"
          customIcon={<Icon color="white" icon="SendIcon" />}
          size="small"
          extClassName={cn(styles.button, props.extClassButton)}
          disabled={!props.inputValue}
          actionType="button"
        />
      </form>
      {fileInput && (
        <div className={styles['file-box']}>
          <Icon color="blue" icon="PinIcon" size="24" />
          <p
            className={cn(
              'm-0',
              'text',
              'text_size_small',
              styles['file-name']
            )}
          >
            {fileName}
          </p>
          <Icon
            color="blue"
            icon="CloseCrossIcon"
            size="14"
            className={styles['btn-close']}
            onClick={hendleDeleteFile}
          />
        </div>
      )}
      {props.containerMessages && (
        <div className={styles['box-message']}>
          {dataMessage.map((m, i) => (
            <Message
              key={i}
              type="send"
              messageText={m.messageText}
              avatarLink=""
            />
          ))}
        </div>
      )}
    </div>
  );
};
