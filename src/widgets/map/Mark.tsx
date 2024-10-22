/* eslint-disable react/display-name */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/no-this-in-sfc */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { FC, memo } from 'react';
import { Placemark, useYMaps } from '@pbe/react-yandex-maps';
import usePermission from 'shared/hooks/use-permission';
import { userRole, userStatus } from 'shared/types/common.types';
import { Task } from 'entities/task/types';
import { isTaskUrgent } from 'shared/libs/utils';
import { useResponseTaskMutation } from 'services/user-task-api';
import type { Dispatch, SetStateAction } from 'react';
import { balloonMarker, taskMarker } from './icons';

type MarkProps = {
  task: Task;
  onClick?: () => void;
  onOpenTask?: (task: Task) => void;
  showPopup?: (isVolunteerSelected: boolean) => void;
  onUnconfirmedClick?: Dispatch<SetStateAction<boolean>>;
  isAuthorised?: boolean;
};

const Mark: FC<MarkProps> = ({
  task,
  onClick,
  showPopup,
  onOpenTask,
  isAuthorised,
}: MarkProps) => {
  const { description, location, date } = task;

  const ymaps = useYMaps(['templateLayoutFactory', 'geocode']);

  const isGranted = usePermission(
    [userStatus.CONFIRMED, userStatus.ACTIVATED, userStatus.VERIFIED],
    userRole.VOLUNTEER
  );
  const [responseTask] = useResponseTaskMutation();

  const properties = Object.assign(
    { ...task },
    {
      isAuthorised: isAuthorised,
      isUrgentTask: date ? isTaskUrgent(date!) : false,
      date: date ? new Date(date!).toLocaleDateString() : 'Бессрочно',
      time: date
        ? new Date(date!).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        : '00:00',
      isDisabled: !isGranted,
    }
  );

  const onClickButton = () => {
    // TODO: переделать showPopup чтобы в зависимости от ответа сервера открывались разные попапы
    isAuthorised &&
      isGranted &&
      responseTask(task._id).then((data) =>
        data.error ? showPopup(false) : showPopup(true)
      );
  };

  if (!ymaps) return null;

  const Iconlayout = ymaps.templateLayoutFactory.createClass(
    taskMarker(properties.isUrgentTask),
    {
      build() {
        Iconlayout.superclass.build.call(this);
        // На метку добавляем кликабильную зону
        this.getData().options.set('shape', {
          type: 'Circle',
          coordinates: [28, 28],
          radius: 30,
        });
      },
    }
  );

  const Balloonlayout = ymaps.templateLayoutFactory.createClass(
    balloonMarker(properties),

    {
      build() {
        Balloonlayout.superclass.build.call(this);

        const mainContainer = this.getParentElement();
        const taskContainer = mainContainer.querySelector('.task_container');
        const recipientPhone = mainContainer.querySelector(
          '.task_recipient_phone'
        );

        (function isValidPhone(): void {
          const phone: string = recipientPhone.textContent;
          const isValid = /^((\+7|7|8)+([0-9]){10})$/.test(phone);
          isValid
            ? (recipientPhone.textContent = `+7(${phone.slice(2, 5)})`.concat(
                ' *** - ** - **'
              ))
            : (recipientPhone.textContent = phone
                .slice(0, 8)
                .concat(' *** - ** - **'));
        })();

        const descriptionContainerHidden = taskContainer.querySelector(
          '.task_description_hidden'
        );

        // Добавляем слушатель на кпонку "читать"
        const buttonRead = taskContainer.querySelector('.task_button');

        // Изменяем видимость кнопки "читать" в зависимости от длины контента
        const hendleReadButton = () => {
          if (description.length < 140) {
            buttonRead.textContent = '';
          }
        };

        hendleReadButton();

        const onReadClick = () => {
          descriptionContainerHidden.classList.toggle(
            'task_description_hidden'
          );
          // eslint-disable-next-line no-unused-expressions
          buttonRead.textContent === 'Читать'
            ? (buttonRead.textContent = 'Свернуть')
            : (buttonRead.textContent = 'Читать');
        };

        buttonRead.addEventListener('click', onReadClick);

        // Добавляем слушатель на иконку "Закрыть окно".
        const buttonClose = taskContainer.querySelector('.close_icon');
        const onCloseClick = () => {
          this.getData().map.balloon.close();
        };
        buttonClose.addEventListener('click', onCloseClick);

        // Добавляем слушатель на иконку "Отклинуться". Колбэк берем из пропсов
        const button = taskContainer.querySelector(
          '.task_button_container > button'
        );
        button.addEventListener('click', onClickButton);
      },
    }
  );

  return (
    <Placemark
      geometry={location}
      options={{
        iconLayout: Iconlayout,
        balloonLayout: Balloonlayout,
        hideIconOnBalloonOpen: false,
        balloonOffset: [-158, 66],
        balloonPanelMaxMapArea: 0,
      }}
      properties={properties}
    />
  );
};

export default memo(Mark);
