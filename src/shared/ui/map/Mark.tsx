/* eslint-disable react/display-name */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/no-this-in-sfc */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import { Placemark, useYMaps } from '@pbe/react-yandex-maps';
import './styles.css';

type MarkProps = {
  id?: number;
  coordinates?: [number, number];
  isUrgentTask?: boolean;
  fullName?: string;
  phone?: string;
  avatar?: string;
  description?: string;
  count?: number;
  onClick?: () => void;
};

export const Mark = React.memo(
  ({
    id,
    coordinates,
    isUrgentTask,
    fullName,
    phone,
    avatar,
    description,
    count,
    onClick,
  }: MarkProps) => {
    const ymaps = useYMaps(['templateLayoutFactory']);

    if (!ymaps) return null;

    const Iconlayout = ymaps.templateLayoutFactory.createClass(
      `{% if properties.isUrgentTask %} 
      <div class="mark_container">
        <svg width="53" height="53" viewBox="0 0 53 53" fill="#D60080" xmlns="http://www.w3.org/2000/svg">
          <circle cx="26.5" cy="26.5" r="26.5" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M20.3135 18.7243C20.3135 22.1202 23.1941 24.801 26.8427 24.801C30.4914 24.801 33.3719 22.1202 33.3719 18.7243C33.3719 15.3285 30.4914 12.6475 26.8427 12.6475C23.1941 12.6475 20.3135 15.3285 20.3135 18.7243ZM21.4658 18.7243C21.4658 16.0434 23.7702 13.7198 26.8427 13.7198C29.9153 13.7198 32.4117 16.0434 32.2197 18.7243C32.2197 21.4053 29.9153 23.7286 26.8427 23.7286C23.9622 23.7286 21.4658 21.584 21.4658 18.7243Z" fill="#FBFDFF"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M26.2664 44.1036C26.4584 44.2824 26.6504 44.461 26.8425 44.461C27.2264 44.461 27.4186 44.461 27.6106 44.1036L37.7885 23.7283C39.3248 20.3325 39.1327 16.4004 37.0203 13.1832C34.908 10.1448 31.4513 8.17873 27.6106 8H26.2664C22.4257 8.17873 18.969 9.96608 16.8566 13.1832C14.7442 16.4004 14.3601 20.3325 16.0884 23.7283L26.2664 44.1036ZM26.2664 8.89365H27.8027C31.2593 9.07238 34.3318 10.8598 36.2522 13.7195C38.1725 16.5792 38.3646 20.3326 36.8284 23.371L27.0345 42.8524L17.2407 23.371C15.7044 20.3326 15.8964 16.5792 17.8168 13.7195C19.5451 10.8598 22.8098 9.07238 26.2664 8.89365Z" fill="#FBFDFF"/>
        </svg>
      </div> {% else %} 
      <div class="mark_container">
        <svg width="53" height="53" viewBox="0 0 53 53" fill="#2E3192" xmlns="http://www.w3.org/2000/svg"> 
          <circle cx="26.5" cy="26.5" r="26.5" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M20.3135 18.7243C20.3135 22.1202 23.1941 24.801 26.8427 24.801C30.4914 24.801 33.3719 22.1202 33.3719 18.7243C33.3719 15.3285 30.4914 12.6475 26.8427 12.6475C23.1941 12.6475 20.3135 15.3285 20.3135 18.7243ZM21.4658 18.7243C21.4658 16.0434 23.7702 13.7198 26.8427 13.7198C29.9153 13.7198 32.4117 16.0434 32.2197 18.7243C32.2197 21.4053 29.9153 23.7286 26.8427 23.7286C23.9622 23.7286 21.4658 21.584 21.4658 18.7243Z" fill="#FBFDFF"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M26.2664 44.1036C26.4584 44.2824 26.6504 44.461 26.8425 44.461C27.2264 44.461 27.4186 44.461 27.6106 44.1036L37.7885 23.7283C39.3248 20.3325 39.1327 16.4004 37.0203 13.1832C34.908 10.1448 31.4513 8.17873 27.6106 8H26.2664C22.4257 8.17873 18.969 9.96608 16.8566 13.1832C14.7442 16.4004 14.3601 20.3325 16.0884 23.7283L26.2664 44.1036ZM26.2664 8.89365H27.8027C31.2593 9.07238 34.3318 10.8598 36.2522 13.7195C38.1725 16.5792 38.3646 20.3326 36.8284 23.371L27.0345 42.8524L17.2407 23.371C15.7044 20.3326 15.8964 16.5792 17.8168 13.7195C19.5451 10.8598 22.8098 9.07238 26.2664 8.89365Z" fill="#FBFDFF"/>
        </svg>
      </div> {% endif %}
      `,
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
      `<div class="task_container">
        <div class="close_icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#2E3192" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 14.4L9.6 8L16 1.6L14.4 0L8 6.4L1.6 0L0 1.6L6.4 8L0 14.4L1.6 16L8 9.6L14.4 16L16 14.4Z" />
          </svg>
        </div>
        <div class="task_bio">
          <img src="{{properties.avatar}}" alt={{properties.fullName}} class="task_avatar"/>
          <div>
            <p class="task_recipient_name">
              {{properties.fullName}}
            </p>
            <p class="task_recipient_phone">{{properties.phone}}</p>
          </div>
        </div>
        <div class="task_description_container">
          <p class="task_description task_description_hidden" >
            {{properties.description}}
          </p>
          <button type="button" class="task_button">Читать</button>
        </div>
        <div class="task_icon_container">
          <p class={% if properties.isUrgentTask %} "task_count_urgent" {% else %} "task_count" {% endif %}>{{properties.count}}</p>
          <svg width="47" height="36" viewBox="0 0 47 36" fill={% if properties.isUrgentTask %} "#D60080" {% else %} "#2E3192" {% endif %} xmlns="http://www.w3.org/2000/svg">
            <path d="M22.5 33C29.8497 33 36.0168 29.1956 37.704 21.9962C37.7102 21.9962 37.7165 21.9962 37.7228 21.9962L37.7358 21.9962C41.1954 21.9962 44 18.5281 44 14.8806C44 11.233 41.1954 7.76493 37.7358 7.76493C37.025 7.76493 36.0506 7.68529 35.4137 7.91528C32.6319 3.3266 28.0485 1 22.5 1C16.9515 1 12.3681 3.3266 9.58627 7.91528C8.94939 7.68529 7.97502 7.76493 7.2642 7.76493C3.80458 7.76493 1 11.233 1 14.8806C1 18.5281 3.80458 21.4851 7.2642 21.4851C7.27482 21.4851 7.28543 21.485 7.29604 21.485C8.98319 28.6844 15.1503 33 22.5 33Z"/>
            <path d="M33.5569 17.7272C33.5569 24.5554 28.2856 30.0908 21.7831 30.0908C15.2806 30.0908 10.0093 24.5554 10.0093 17.7272C10.0093 10.8989 15.2806 5.36353 21.7831 5.36353C28.2856 5.36353 33.5569 10.8989 33.5569 17.7272Z" stroke="white" stroke-width="0.5"/>
            <path d="M27.6403 17.1069C27.7228 17.9658 27.6331 18.8332 27.377 19.6534C27.1208 20.4736 26.704 21.2284 26.1532 21.8692C25.6024 22.5099 24.93 23.0225 24.1792 23.3738C23.4283 23.7251 22.6158 23.9074 21.7938 23.909C20.9718 23.9105 20.1586 23.7313 19.4065 23.3828C18.6545 23.0344 17.9803 22.5244 17.4273 21.8857C16.8744 21.247 16.4549 20.4938 16.196 19.6746C15.937 18.8553 15.8443 17.9882 15.9238 17.1291L16.5493 17.193C16.4782 17.9604 16.561 18.7349 16.7924 19.4667C17.0237 20.1985 17.3983 20.8713 17.8923 21.4418C18.3862 22.0123 18.9884 22.4679 19.6602 22.7791C20.332 23.0904 21.0584 23.2505 21.7926 23.2491C22.5269 23.2477 23.2527 23.0849 23.9234 22.7711C24.5941 22.4572 25.1948 21.9994 25.6867 21.427C26.1787 20.8547 26.5511 20.1804 26.7799 19.4478C27.0087 18.7151 27.0888 17.9403 27.0151 17.1731L27.6403 17.1069Z" stroke="white" stroke-width="0.5"/>
            <path d="M19.4284 14.0181C19.4284 14.7009 18.9012 15.2544 18.251 15.2544C17.6007 15.2544 17.0736 14.7009 17.0736 14.0181C17.0736 13.3352 17.6007 12.7817 18.251 12.7817C18.9012 12.7817 19.4284 13.3352 19.4284 14.0181Z" stroke="white" stroke-width="0.5"/>
            <path d="M26.4927 14.0181C26.4927 14.7009 25.9655 15.2544 25.3153 15.2544C24.665 15.2544 24.1379 14.7009 24.1379 14.0181C24.1379 13.3352 24.665 12.7817 25.3153 12.7817C25.9655 12.7817 26.4927 13.3352 26.4927 14.0181Z" stroke="white" stroke-width="0.5"/>
            <path d="M33.1975 20.1855C33.9213 20.2436 34.6482 20.1253 35.3213 19.8397C35.9943 19.5542 36.5954 19.109 37.0776 18.5392C37.5598 17.9693 37.91 17.2901 38.1008 16.5546C38.2917 15.8191 38.318 15.0472 38.1778 14.2992C38.0376 13.5513 37.7346 12.8475 37.2925 12.2428C36.8504 11.6381 36.2812 11.149 35.6293 10.8135C34.9774 10.4781 34.2605 10.3054 33.5346 10.309C32.8086 10.3127 32.0933 10.4925 31.4445 10.8344L32.6407 13.3372C32.9221 13.1889 33.2324 13.1109 33.5472 13.1094C33.8621 13.1078 34.1731 13.1827 34.4558 13.3282C34.7386 13.4737 34.9855 13.6859 35.1773 13.9481C35.369 14.2104 35.5004 14.5157 35.5612 14.8401C35.6221 15.1645 35.6106 15.4993 35.5279 15.8184C35.4451 16.1374 35.2932 16.432 35.084 16.6792C34.8749 16.9264 34.6142 17.1195 34.3222 17.2433C34.0303 17.3672 33.715 17.4185 33.401 17.3933L33.1975 20.1855Z" stroke="white" stroke-width="0.5"/>
            <path d="M10.3688 20.1855C9.64495 20.2436 8.91811 20.1253 8.24502 19.8397C7.57194 19.5542 6.97084 19.109 6.48867 18.5392C6.0065 17.9693 5.65631 17.2901 5.46546 16.5546C5.27462 15.8191 5.24827 15.0472 5.38849 14.2992C5.52871 13.5513 5.83169 12.8475 6.27378 12.2428C6.71586 11.6381 7.28508 11.149 7.93697 10.8135C8.58886 10.4781 9.30577 10.3054 10.0317 10.309C10.7577 10.3127 11.473 10.4925 12.1218 10.8344L10.9256 13.3372C10.6442 13.1889 10.3339 13.1109 10.019 13.1094C9.70416 13.1078 9.3932 13.1827 9.11044 13.3282C8.82768 13.4737 8.58078 13.6859 8.38902 13.9481C8.19727 14.2104 8.06585 14.5157 8.00503 14.8401C7.94421 15.1645 7.95564 15.4993 8.03842 15.8184C8.1212 16.1374 8.27309 16.432 8.48223 16.6792C8.69138 16.9264 8.95211 17.1195 9.24406 17.2433C9.53601 17.3672 9.85128 17.4185 10.1652 17.3933L10.3688 20.1855Z" stroke="white" stroke-width="0.5"/>
          </svg>
        </div>
        <div class="task_button_container">
          <button 
            type="button"
            class={% if properties.isUrgentTask %} "submit_button_urgent" {% else %} "submit_button" {% endif %}
          >
            Откликнуться
          </button>
        </div>
      </div>
      `,
      {
        build() {
          Balloonlayout.superclass.build.call(this);

          const mainContainer = this.getParentElement();
          const taskContainer = mainContainer.querySelector('.task_container');

          // Добавляем слушатель на кпонку "читать"
          const buttonRead = taskContainer.querySelector('.task_button');
          const descriptionContainer = taskContainer.querySelector(
            '.task_description_hidden'
          );
          const onReadClick = () => {
            descriptionContainer.classList.toggle('task_description_hidden');
            // eslint-disable-next-line no-unused-expressions
            buttonRead.textContent === 'Читать'
              ? (buttonRead.textContent = 'Свернуть')
              : (buttonRead.textContent = 'Читать');
          };
          buttonRead.addEventListener('click', onReadClick);

          // Добавляем слушатель на кпонку "Закрыть окно".
          const buttonClose = taskContainer.querySelector('.close_icon');
          const onCloseClick = () => {
            this.getData().map.balloon.close();
          };
          buttonClose.addEventListener('click', onCloseClick);

          // Добавляем слушатель на кпонку "Отклинуться". Колбэк берем из пропсов
          const button = taskContainer
            .querySelector('.task_button_container')
            .querySelector('button');
          button.addEventListener('click', onClick);
        },
      }
    );

    return (
      <Placemark
        geometry={coordinates}
        options={{
          iconLayout: Iconlayout,
          balloonLayout: Balloonlayout,
          hideIconOnBalloonOpen: false,
          balloonOffset: [-158, 66],
          balloonPanelMaxMapArea: 0,
        }}
        properties={{
          isUrgentTask,
          fullName,
          phone,
          avatar,
          description,
          count,
        }}
      />
    );
  }
);
