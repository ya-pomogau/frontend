import { nanoid } from "nanoid";
import classNames from "classnames";
import { Informer } from "shared/ui/informer";
import { RoundButton } from "shared/ui/round-button";
import { TUserRole } from "entities/user/types";
import { Task } from "../task";

import styles from "./styles.module.css";

interface TaskProps {
  category: string;
  date: string;
  time: string;
  address: string;
  title: string;
  description: string;
  count: string;
  avatarName: string;
  avatarLink: string;
  recipientName: string;
  recipientPhoneNumber: string;
  activeStatus: boolean;
  confirmStatus: boolean;
}

interface TaskListProps {
  role: TUserRole;
  tasks: Array<TaskProps>;
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
  if (tasks.length > 0 && isStatusActive) {
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
        {tasks.map((item) => {
          if (item.confirmStatus) {
            return (
              <li key={nanoid()}>
                <Task
                  category={item.category}
                  isMobile={isMobile}
                  date={item.date}
                  time={item.time}
                  address={item.address}
                  title={item.title}
                  description={item.description}
                  count={item.count}
                  avatarName={item.avatarName}
                  avatarLink={item.avatarLink}
                  recipientName={item.recipientName}
                  recipientPhoneNumber={item.recipientPhoneNumber}
                  handleClickPnoneButton={handleClickPnoneButton}
                  handleClickMessageButton={handleClickMessageButton}
                  handleClickConfirmButton={handleClickConfirmButton}
                  handleClickCloseButton={handleClickCloseButton}
                />
              </li>
            );
          }

          return (
            <li key={nanoid()}>
              <Task
                category={item.category}
                isMobile={isMobile}
                date={item.date}
                time={item.time}
                address={item.address}
                title={item.title}
                description={item.description}
                count={item.count}
                avatarName={item.avatarName}
                avatarLink={item.avatarLink}
                recipientName={item.recipientName}
                recipientPhoneNumber={item.recipientPhoneNumber}
                handleClickPnoneButton={handleClickPnoneButton}
                handleClickMessageButton={handleClickMessageButton}
                handleClickCloseButton={handleClickCloseButton}
                handleClickEditButton={handleClickEditButton}
              />
            </li>
          );
        })}
      </ul>
    );
  }

  if (tasks.length > 0 && !isStatusActive) {
    return (
      <ul className={classNames(styles.content, "list", "p-0", extClassName)}>
        {tasks.map((item) => (
          <li key={nanoid()}>
            <Task
              category={item.category}
              isMobile={isMobile}
              date={item.date}
              time={item.time}
              address={item.address}
              title={item.title}
              description={item.description}
              count={item.count}
              avatarName={item.avatarName}
              avatarLink={item.avatarLink}
              recipientName={item.recipientName}
              recipientPhoneNumber={item.recipientPhoneNumber}
              handleClickPnoneButton={handleClickPnoneButton}
              handleClickMessageButton={handleClickMessageButton}
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
