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
    `{% if properties.isAuthorised %}
      <div class="task_container">
        <div class="close_icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#2E3192" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 14.4L9.6 8L16 1.6L14.4 0L8 6.4L1.6 0L0 1.6L6.4 8L0 14.4L1.6 16L8 9.6L14.4 16L16 14.4Z" />
          </svg>
        </div>
        <div class="task_bio">
          <img src="{{properties.recipient.avatar}}" alt={{properties.recipient.name}} class="task_avatar"/>
          <div>
            <p class="task_recipient_name">
              {{properties.recipient.name}}
            </p>
            <p class="task_recipient_phone">{{properties.recipient.phone}}</p>
          </div>
        </div>
        <div class="task_description_container">
          <p class="task_description task_description_hidden" >
            {{properties.description}}
          </p>

        </div>
        <div class="task_icon_container">
          <div class="task_icon_date_count">
            <div class="task_box">
              <svg width="17" height="18" viewBox="0 0 17 18" fill={% if properties.isUrgentTask %} "#D60080" {% else %} "#2E3192" {% endif %} xmlns="http://www.w3.org/2000/svg">
                <path d="M16.7548 17.7441H0.245182C0.0817208 17.7441 0 17.6616 0 17.4966V2.80718C0 2.64213 0.0817208 2.55957 0.245182 2.55957H16.7548C16.9183 2.55957 17 2.64213 17 2.80718V17.4966C16.9183 17.6616 16.8365 17.7441 16.7548 17.7441ZM0.408654 17.2489H16.5096V2.97219H0.408654V17.2489Z" />
                <path d="M12.668 4.29273C12.5046 4.29273 12.4229 4.21016 12.4229 4.04512V0.991754C12.4229 0.826705 12.5046 0.744141 12.668 0.744141C12.8315 0.744141 12.9132 0.826705 12.9132 0.991754V4.04512C12.9132 4.21016 12.7498 4.29273 12.668 4.29273Z" />
                <path d="M4.16855 4.29273C4.00509 4.29273 3.92334 4.21016 3.92334 4.04512V0.991754C3.92334 0.826705 4.00509 0.744141 4.16855 0.744141C4.33201 0.744141 4.41373 0.826705 4.41373 0.991754V4.04512C4.41373 4.21016 4.25028 4.29273 4.16855 4.29273Z" />
                <path d="M4.33171 13.3705V13.0404C4.41344 12.9578 4.57691 12.7928 4.8221 12.6277C5.06729 12.4627 5.14903 12.2976 5.31249 12.2151C5.39422 12.1326 5.55768 11.9675 5.72114 11.8025C5.88461 11.6374 6.04807 11.4724 6.1298 11.3899C6.21153 11.3073 6.37499 11.1423 6.45672 10.9773C6.53845 10.8122 6.70192 10.7297 6.70192 10.5646C6.86539 10.2345 6.94711 9.98696 6.94711 9.73939C6.94711 9.49181 6.86539 9.24422 6.70192 8.99665C6.53846 8.8316 6.29327 8.66653 5.88462 8.66653C5.55769 8.66653 5.23077 8.74907 5.06731 8.99665C4.90385 9.24422 4.74036 9.49179 4.74036 9.82189H4.25C4.25 9.32674 4.41344 8.9141 4.74036 8.66653C4.98556 8.41895 5.39423 8.25391 5.80288 8.25391C6.29327 8.25391 6.62018 8.41895 6.86537 8.66653C7.11056 8.9141 7.27403 9.24424 7.27403 9.73939C7.27403 9.90443 7.27404 10.1519 7.11058 10.3995C7.02885 10.6471 6.9471 10.8122 6.86537 10.9773C6.78364 11.1423 6.62017 11.3073 6.37498 11.5549C6.21152 11.8025 6.04808 11.9675 5.88462 12.05C5.80289 12.1325 5.55768 12.2977 5.31249 12.5452C5.0673 12.7103 4.90384 12.8753 4.90384 12.9579H7.35576V13.3705H4.33171Z" />
                <path d="M9.39895 8.58402C9.72588 8.33645 10.0528 8.25391 10.5432 8.25391C10.9518 8.25391 11.3605 8.33645 11.6057 8.58402C11.8509 8.8316 12.0143 9.16167 12.0143 9.49177C12.0143 9.73935 11.9326 9.98694 11.7691 10.2345C11.6057 10.4821 11.4422 10.5646 11.1153 10.6471C11.4422 10.7297 11.6057 10.8947 11.7691 11.1423C11.9326 11.3898 12.0143 11.7199 12.0143 12.05C12.0143 12.4626 11.8509 12.7103 11.6057 13.0404C11.3605 13.2879 10.9518 13.453 10.4614 13.453C9.97106 13.453 9.56241 13.3704 9.31722 13.1229C8.99029 12.8753 8.82683 12.5452 8.82683 12.1326H9.23548C9.23548 12.3802 9.39894 12.6277 9.64414 12.7927C9.88933 12.9578 10.1345 13.0404 10.4614 13.0404C10.7884 13.0404 11.1153 12.9578 11.2788 12.7927C11.4422 12.6277 11.524 12.3801 11.524 12.05C11.524 11.6374 11.3605 11.3898 11.1153 11.2248C10.8701 11.0597 10.4615 10.9773 9.97108 10.9773H9.80761V10.5646H9.97108C10.9518 10.5646 11.3605 10.2346 11.3605 9.65688C11.3605 9.40931 11.2788 9.16169 11.1153 8.99665C10.9518 8.8316 10.7067 8.74903 10.3797 8.74903C10.0528 8.74903 9.80762 8.8316 9.56243 8.99665C9.39896 9.16169 9.23548 9.3267 9.23548 9.57428H8.74512C8.90858 9.07913 9.07203 8.8316 9.39895 8.58402Z" />
                <path d="M16.7549 5.36549H0.408757C0.245295 5.36549 0.163574 5.28302 0.163574 5.11797C0.163574 4.95293 0.245295 4.87036 0.408757 4.87036H16.7549C16.9184 4.87036 17.0001 4.95293 17.0001 5.11797C16.9184 5.2005 16.8367 5.36549 16.7549 5.36549Z" />
              </svg>
              <p class={% if properties.isUrgentTask %} "task_date_text_urgent" {% else %} "task_date_text" {% endif %}>{{properties.date}}</p>
            </div>
            <div class="task_box">
              <p class={% if properties.isUrgentTask %} "task_count_urgent" {% else %} "task_count" {% endif %}>{{properties.category.points}}</p>
              <svg width="42" height="30" viewBox="0 0 42 30" fill={% if properties.isUrgentTask %} "#D60080" {% else %} "#2E3192" {% endif %} xmlns="http://www.w3.org/2000/svg">
                <path d="M21 30C28.1787 30 34.2025 26.4333 35.8504 19.6839C35.8565 19.6839 35.8626 19.684 35.8687 19.684L35.8815 19.684C39.2606 19.684 42 16.4326 42 13.0131C42 9.59347 39.2606 6.34212 35.8815 6.34212C35.1872 6.34212 34.2355 6.26746 33.6134 6.48308C30.8962 2.18119 26.4195 0 21 0C15.5805 0 11.1038 2.18119 8.38659 6.48308C7.76452 6.26746 6.81281 6.34212 6.11852 6.34212C2.73935 6.34212 0 9.59347 0 13.0131C0 16.4326 2.73935 19.2047 6.11852 19.2047C6.12889 19.2047 6.13926 19.2047 6.14962 19.2047C7.79754 25.9541 13.8213 30 21 30Z"/>
                <path d="M32.6 15.5909C32.6 21.9924 27.4513 27.1818 21.1 27.1818C14.7487 27.1818 9.6 21.9924 9.6 15.5909C9.6 9.18943 14.7487 4 21.1 4C27.4513 4 32.6 9.18943 32.6 15.5909Z" stroke="white" stroke-width="0.5"/>
                <path d="M26.821 15.0094C26.9015 15.8146 26.8139 16.6278 26.5637 17.3968C26.3136 18.1657 25.9064 18.8733 25.3684 19.474C24.8305 20.0747 24.1737 20.5553 23.4403 20.8846C22.7069 21.214 21.9132 21.3849 21.1104 21.3864C20.3075 21.3878 19.5132 21.2198 18.7787 20.8931C18.0441 20.5664 17.3856 20.0883 16.8455 19.4895C16.3054 18.8908 15.8957 18.1846 15.6428 17.4166C15.3898 16.6486 15.2993 15.8357 15.377 15.0302L15.9879 15.0901C15.9185 15.8096 15.9993 16.5357 16.2253 17.2217C16.4512 17.9078 16.8172 18.5385 17.2996 19.0734C17.7821 19.6082 18.3703 20.0353 19.0264 20.3271C19.6826 20.619 20.3921 20.769 21.1093 20.7677C21.8264 20.7664 22.5354 20.6138 23.1905 20.3196C23.8456 20.0254 24.4323 19.5961 24.9128 19.0595C25.3933 18.5229 25.7571 17.8909 25.9805 17.204C26.204 16.5171 26.2823 15.7907 26.2103 15.0715L26.821 15.0094Z" stroke="white" stroke-width="0.5"/>
                <path d="M18.8 12.1136C18.8 12.7538 18.2851 13.2727 17.65 13.2727C17.0149 13.2727 16.5 12.7538 16.5 12.1136C16.5 11.4735 17.0149 10.9545 17.65 10.9545C18.2851 10.9545 18.8 11.4735 18.8 12.1136Z" stroke="white" stroke-width="0.5"/>
                <path d="M25.7 12.1136C25.7 12.7538 25.1851 13.2727 24.55 13.2727C23.9149 13.2727 23.4 12.7538 23.4 12.1136C23.4 11.4735 23.9149 10.9545 24.55 10.9545C25.1851 10.9545 25.7 11.4735 25.7 12.1136Z" stroke="white" stroke-width="0.5"/>
                <path d="M32.2489 17.8956C32.9559 17.9501 33.6658 17.8392 34.3233 17.5715C34.9807 17.3037 35.5678 16.8864 36.0388 16.3522C36.5097 15.8179 36.8518 15.1811 37.0382 14.4916C37.2246 13.8021 37.2503 13.0784 37.1134 12.3772C36.9764 11.676 36.6805 11.0162 36.2487 10.4493C35.8169 9.88244 35.2609 9.42385 34.6242 9.10937C33.9874 8.79488 33.2872 8.63302 32.5781 8.63642C31.8691 8.63981 31.1704 8.80838 30.5367 9.12895L31.705 11.4754C31.9799 11.3363 32.283 11.2632 32.5905 11.2617C32.8981 11.2602 33.2018 11.3305 33.478 11.4669C33.7542 11.6033 33.9953 11.8022 34.1826 12.0481C34.3699 12.2939 34.4983 12.5801 34.5577 12.8843C34.6171 13.1884 34.6059 13.5023 34.5251 13.8014C34.4442 14.1005 34.2959 14.3767 34.0916 14.6084C33.8873 14.8402 33.6326 15.0212 33.3475 15.1373C33.0623 15.2534 32.7544 15.3016 32.4477 15.2779L32.2489 17.8956Z" stroke="white" stroke-width="0.5"/>
                <path d="M9.9511 17.8956C9.2441 17.9501 8.53416 17.8392 7.87673 17.5715C7.21929 17.3037 6.63217 16.8864 6.16121 16.3522C5.69026 15.8179 5.34822 15.1811 5.16181 14.4916C4.9754 13.8021 4.94967 13.0784 5.08662 12.3772C5.22358 11.676 5.51952 11.0162 5.95132 10.4493C6.38312 9.88244 6.9391 9.42385 7.57583 9.10937C8.21256 8.79488 8.9128 8.63302 9.62186 8.63642C10.3309 8.63981 11.0296 8.80838 11.6633 9.12895L10.495 11.4754C10.2201 11.3363 9.91704 11.2632 9.60948 11.2617C9.30193 11.2602 8.9982 11.3305 8.72201 11.4669C8.44583 11.6033 8.20467 11.8022 8.01738 12.0481C7.83008 12.2939 7.70172 12.5801 7.64231 12.8843C7.58291 13.1884 7.59407 13.5023 7.67492 13.8014C7.75578 14.1005 7.90414 14.3767 8.10842 14.6084C8.3127 14.8402 8.56736 15.0212 8.85253 15.1373C9.13769 15.2534 9.44563 15.3016 9.75229 15.2779L9.9511 17.8956Z" stroke="white" stroke-width="0.5"/>
              </svg>
            </div>
          </div>
          <div class="task_box" >
            <svg width="17" height="17" viewBox="0 0 17 17" fill={% if properties.isUrgentTask %} "#D60080" {% else %} "#2E3192" {% endif %} xmlns="http://www.w3.org/2000/svg">
              <path d="M8.49936 17C3.75934 17 0 13.1587 0 8.50005C0 3.75965 3.84107 0 8.49936 0C13.2394 0 16.9987 3.84138 16.9987 8.50005C17.0804 13.2405 13.2394 17 8.49936 17ZM8.49936 0.408655C4.08624 0.408655 0.408622 4.00484 0.408622 8.50005C0.408622 12.9135 4.00452 16.5913 8.49936 16.5913C12.9125 16.5913 16.5901 12.9953 16.5901 8.50005C16.5901 4.08657 12.9942 0.408655 8.49936 0.408655Z" />
              <path d="M5.88393 11.2788C5.80221 11.2788 5.72047 11.2789 5.72047 11.1971C5.63875 11.1154 5.63875 10.9519 5.72047 10.8702L7.76358 8.90871C7.84531 8.82698 8.00878 8.82698 8.0905 8.90871C8.17223 8.99044 8.17223 9.15382 8.0905 9.23555L6.04739 11.1971C5.96567 11.2789 5.96566 11.2788 5.88393 11.2788Z" />
              <path d="M8.49907 7.92789C8.33562 7.92789 8.25391 7.84621 8.25391 7.68275V2.37023C8.25391 2.20677 8.33562 2.125 8.49907 2.125C8.66252 2.125 8.74423 2.20677 8.74423 2.37023V7.68275C8.74423 7.84621 8.66252 7.92789 8.49907 7.92789Z" />
              <path d="M8.49953 9.39897C8.00919 9.39897 7.60059 8.99034 7.60059 8.49995C7.60059 8.00957 8.00919 7.60083 8.49953 7.60083C8.98988 7.60083 9.39848 8.00957 9.39848 8.49995C9.39848 8.99034 9.07161 9.39897 8.49953 9.39897ZM8.49953 8.00949C8.25436 8.00949 8.00921 8.25476 8.00921 8.49995C8.00921 8.74514 8.25436 8.99032 8.49953 8.99032C8.74471 8.99032 8.98986 8.74514 8.98986 8.49995C8.98986 8.25476 8.82643 8.00949 8.49953 8.00949Z" />
            
            </svg>
            <p class={% if properties.isUrgentTask %} "task_date_text_urgent" {% else %} "task_date_text" {% endif %}>{{properties.time}}</p>
          </div>
        </div>
        <div class="task_button_container">
          <button
            type="button"
            class="submit_button {% if properties.isUrgentTask %} submit_button_urgent {% endif %}{% if properties.isDisabled %} submit_button_disabled {% endif %}"
          >
            Откликнуться
          </button>
        </div>
      </div>
      {% else %}
      <div class="task_container">
        <div class="close_icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#2E3192" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 14.4L9.6 8L16 1.6L14.4 0L8 6.4L1.6 0L0 1.6L6.4 8L0 14.4L1.6 16L8 9.6L14.4 16L16 14.4Z" />
          </svg>
        </div>
        <div class="task_bio">
          <img src="{{properties.recipient.avatar}}" alt={{properties.recipient.name}} class="task_avatar"/>
          <div>
            <p class="task_recipient_name">
               Нужна помощь
            </p>
            <p class="task_recipient_phone">+7 (000) ***-**-**</p>
          </div>
        </div>
        <div class="task_description_container">
          <p class="task_description task_description_hidden" >
            {{properties.category.title}}
          </p>

        </div>
        <div class="task_icon_box">
          <p class={% if properties.isUrgentTask %} "task_count_urgent" {% else %} "task_count" {% endif %}>{{properties.category.count}}</p>
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
            class="submit_button {% if properties.isUrgentTask %} submit_button_urgent {% endif %}{% if properties.isDisabled %} submit_button_disabled {% endif %}"
          >
            Откликнуться
          </button>
        </div>
      </div> {% endif %}
      `,

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

        const descriptionContainer =
          taskContainer.querySelector('.task_description');

        (function hendleDescriptionText() {
          if (onOpenTask) onOpenTask(task);
          if (description.length > 120) {
            if (window.innerWidth <= 735) {
              descriptionContainerHidden.textContent = description
                .slice(0, 100)
                .concat('...');
            } else {
              descriptionContainerHidden.textContent = description
                .slice(0, 120)
                .concat('...');
            }

            const button = document.createElement('button');
            button.classList.add('task_button');
            button.setAttribute('type', 'button');
            button.textContent = 'Читать';
            descriptionContainerHidden.appendChild(button);
          }
          if (description.length < 120) {
            descriptionContainerHidden.textContent = description;
          }
        })();

        const onReadClick = () => {
          descriptionContainerHidden.classList.toggle(
            'task_description_hidden'
          );
          // eslint-disable-next-line no-unused-expressions
          descriptionContainer.textContent = description;
        };

        const buttonRead =
          descriptionContainerHidden.querySelector('.task_button');
        buttonRead?.addEventListener('click', onReadClick);

        // Добавляем слушатель на кпонку "Закрыть окно".
        const buttonClose = taskContainer.querySelector('.close_icon');
        const onCloseClick = () => {
          this.getData().map.balloon.close();
        };
        buttonClose.addEventListener('click', onCloseClick);

        // Добавляем слушатель на кпонку "Отклинуться". Колбэк берем из пропсов
        const button = taskContainer.querySelector(
          '.task_button_container > button'
        );
        button.addEventListener('click', onClickButton);
      },
    }
  );

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
