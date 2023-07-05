import classNames from "classnames";
import { nanoid } from "nanoid";
import { format } from "date-fns";
import { Informer } from "shared/ui/informer";
import { RoundButton } from "shared/ui/round-button";
import { TUserRole } from "entities/user/types";
import { TTask } from "entities/task/types";
import { Task } from "../task";

import styles from "./styles.module.css";

interface TaskListProps {
  role: TUserRole;
  tasks: Array<TTask>;
  extClassName?: string;
  isStatusActive: boolean;
  isMobile: boolean;
  handleClickPnoneButton: () => void;
  handleClickMessageButton: () => void;
  handleClickConfirmButton: () => void;
  handleClickCloseButton: () => void;
  handleClickEditButton?: () => void;
  handleClickAddTaskButton?: () => void;
}

export const TaskList = ({
  role,
  tasks,
  extClassName,
  isStatusActive,
  isMobile,
  handleClickPnoneButton,
  handleClickMessageButton,
  handleClickConfirmButton,
  handleClickCloseButton,
  handleClickEditButton,
  handleClickAddTaskButton,
}: TaskListProps) => {
  if (tasks.length > 0) {
    return (
      <ul
        className={classNames(
          styles.content,
          "list",
          "p-0",
          "m-0",
          extClassName
        )}
      >
        {role === "recipient" && (
          <li className={isMobile ? styles.add_task_mobile : styles.add_task}>
            <RoundButton
              buttonType="add"
              onClick={handleClickAddTaskButton}
              size={isMobile ? "medium" : "large"}
              extClassName={styles.add_task_icon}
            />
            <h2
              className={`${styles.title_add_list} ${
                isMobile ? "text_size_medium" : "text_size_large"
              } text_type_regular`}
            >
              Создать заявку
            </h2>
          </li>
        )}
        {
        tasks.map((item) => (
            <li key={nanoid()}>
              <Task
                category={item.category.name}
                isMobile={isMobile}
                date={format(new Date(item.date), 'dd.MM.yyyy')}
                time={format(new Date(item.date), 'kk.mm')}
                address={item.address}
                title={item.title}
                description={item.description}
                count={item.category.scope}
                avatar={item.recipient.avatar}
                completed={item.completed}
                recipientName={item.recipient.fullname}
                recipientPhoneNumber={item.recipient.phone}
                handleClickPnoneButton={handleClickPnoneButton}
                handleClickMessageButton={handleClickMessageButton}
                handleClickConfirmButton={
                  !item.completed ? handleClickConfirmButton : undefined
                }
                handleClickCloseButton={
                  isStatusActive ? handleClickCloseButton : undefined
                }
                handleClickEditButton={
                  isStatusActive ? handleClickEditButton : undefined
                }
              />
            </li>
          ))}
      </ul>
    );
  }

  if (!tasks.length && isStatusActive && role === "recipient") {
    return (
      <div
        className={classNames(
          isMobile ? styles.content_empty_mobile : styles.content_empty,
          extClassName
        )}
      >
        <Informer text="У Вас пока нет заявок" />
        <p
          className={`${styles.title_add_empty} text_size_large text_type_regular`}
        >
          {" "}
          Хотите создать заявку?
        </p>
        <RoundButton
          buttonType="add"
          onClick={handleClickAddTaskButton}
          size="large"
        />
      </div>
    );
  }

  if (!tasks.length && isStatusActive && role === "volunteer") {
    return (
      <div
        className={classNames(
          isMobile ? styles.content_empty_mobile : styles.content_empty,
          extClassName
        )}
      >
        <Informer text="У Вас пока нет заявок" />
      </div>
    );
  }

  if (!tasks.length && !isStatusActive) {
    return (
      <div
        className={classNames(
          isMobile ? styles.content_empty_mobile : styles.content_empty,
          extClassName
        )}
      >
        <Informer text="У Вас нет завершенных заявок" />
      </div>
    );
  }

  return null;
};
