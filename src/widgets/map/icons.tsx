import { TaskProperties } from 'entities/task/types';

const circleWithBalloonSvg = (
  urgentColor: string
) => `<svg width="53" height="53" viewBox="0 0 53 53" fill="${urgentColor}" xmlns="http://www.w3.org/2000/svg">
  <circle cx="26.5" cy="26.5" r="26.5" />
  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.3135 18.7243C20.3135 22.1202 23.1941 24.801 26.8427 24.801C30.4914 24.801 33.3719 22.1202 33.3719 18.7243C33.3719 15.3285 30.4914 12.6475 26.8427 12.6475C23.1941 12.6475 20.3135 15.3285 20.3135 18.7243ZM21.4658 18.7243C21.4658 16.0434 23.7702 13.7198 26.8427 13.7198C29.9153 13.7198 32.4117 16.0434 32.2197 18.7243C32.2197 21.4053 29.9153 23.7286 26.8427 23.7286C23.9622 23.7286 21.4658 21.584 21.4658 18.7243Z" fill="#FBFDFF"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M26.2664 44.1036C26.4584 44.2824 26.6504 44.461 26.8425 44.461C27.2264 44.461 27.4186 44.461 27.6106 44.1036L37.7885 23.7283C39.3248 20.3325 39.1327 16.4004 37.0203 13.1832C34.908 10.1448 31.4513 8.17873 27.6106 8H26.2664C22.4257 8.17873 18.969 9.96608 16.8566 13.1832C14.7442 16.4004 14.3601 20.3325 16.0884 23.7283L26.2664 44.1036ZM26.2664 8.89365H27.8027C31.2593 9.07238 34.3318 10.8598 36.2522 13.7195C38.1725 16.5792 38.3646 20.3326 36.8284 23.371L27.0345 42.8524L17.2407 23.371C15.7044 20.3326 15.8964 16.5792 17.8168 13.7195C19.5451 10.8598 22.8098 9.07238 26.2664 8.89365Z" fill="#FBFDFF"/>
</svg>`;

const crossSvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="#2E3192" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 14.4L9.6 8L16 1.6L14.4 0L8 6.4L1.6 0L0 1.6L6.4 8L0 14.4L1.6 16L8 9.6L14.4 16L16 14.4Z" />
    </svg>`;

const urgentCalendarIconSvg = (
  urgentColor: string
) => `<svg width="17" height="18" viewBox="0 0 17 18" fill="${urgentColor}" xmlns="http://www.w3.org/2000/svg">
<path d="M16.7548 17.7441H0.245182C0.0817208 17.7441 0 17.6616 0 17.4966V2.80718C0 2.64213 0.0817208 2.55957 0.245182 2.55957H16.7548C16.9183 2.55957 17 2.64213 17 2.80718V17.4966C16.9183 17.6616 16.8365 17.7441 16.7548 17.7441ZM0.408654 17.2489H16.5096V2.97219H0.408654V17.2489Z" />
<path d="M12.668 4.29273C12.5046 4.29273 12.4229 4.21016 12.4229 4.04512V0.991754C12.4229 0.826705 12.5046 0.744141 12.668 0.744141C12.8315 0.744141 12.9132 0.826705 12.9132 0.991754V4.04512C12.9132 4.21016 12.7498 4.29273 12.668 4.29273Z" />
<path d="M4.16855 4.29273C4.00509 4.29273 3.92334 4.21016 3.92334 4.04512V0.991754C3.92334 0.826705 4.00509 0.744141 4.16855 0.744141C4.33201 0.744141 4.41373 0.826705 4.41373 0.991754V4.04512C4.41373 4.21016 4.25028 4.29273 4.16855 4.29273Z" />
<path d="M4.33171 13.3705V13.0404C4.41344 12.9578 4.57691 12.7928 4.8221 12.6277C5.06729 12.4627 5.14903 12.2976 5.31249 12.2151C5.39422 12.1326 5.55768 11.9675 5.72114 11.8025C5.88461 11.6374 6.04807 11.4724 6.1298 11.3899C6.21153 11.3073 6.37499 11.1423 6.45672 10.9773C6.53845 10.8122 6.70192 10.7297 6.70192 10.5646C6.86539 10.2345 6.94711 9.98696 6.94711 9.73939C6.94711 9.49181 6.86539 9.24422 6.70192 8.99665C6.53846 8.8316 6.29327 8.66653 5.88462 8.66653C5.55769 8.66653 5.23077 8.74907 5.06731 8.99665C4.90385 9.24422 4.74036 9.49179 4.74036 9.82189H4.25C4.25 9.32674 4.41344 8.9141 4.74036 8.66653C4.98556 8.41895 5.39423 8.25391 5.80288 8.25391C6.29327 8.25391 6.62018 8.41895 6.86537 8.66653C7.11056 8.9141 7.27403 9.24424 7.27403 9.73939C7.27403 9.90443 7.27404 10.1519 7.11058 10.3995C7.02885 10.6471 6.9471 10.8122 6.86537 10.9773C6.78364 11.1423 6.62017 11.3073 6.37498 11.5549C6.21152 11.8025 6.04808 11.9675 5.88462 12.05C5.80289 12.1325 5.55768 12.2977 5.31249 12.5452C5.0673 12.7103 4.90384 12.8753 4.90384 12.9579H7.35576V13.3705H4.33171Z" />
<path d="M9.39895 8.58402C9.72588 8.33645 10.0528 8.25391 10.5432 8.25391C10.9518 8.25391 11.3605 8.33645 11.6057 8.58402C11.8509 8.8316 12.0143 9.16167 12.0143 9.49177C12.0143 9.73935 11.9326 9.98694 11.7691 10.2345C11.6057 10.4821 11.4422 10.5646 11.1153 10.6471C11.4422 10.7297 11.6057 10.8947 11.7691 11.1423C11.9326 11.3898 12.0143 11.7199 12.0143 12.05C12.0143 12.4626 11.8509 12.7103 11.6057 13.0404C11.3605 13.2879 10.9518 13.453 10.4614 13.453C9.97106 13.453 9.56241 13.3704 9.31722 13.1229C8.99029 12.8753 8.82683 12.5452 8.82683 12.1326H9.23548C9.23548 12.3802 9.39894 12.6277 9.64414 12.7927C9.88933 12.9578 10.1345 13.0404 10.4614 13.0404C10.7884 13.0404 11.1153 12.9578 11.2788 12.7927C11.4422 12.6277 11.524 12.3801 11.524 12.05C11.524 11.6374 11.3605 11.3898 11.1153 11.2248C10.8701 11.0597 10.4615 10.9773 9.97108 10.9773H9.80761V10.5646H9.97108C10.9518 10.5646 11.3605 10.2346 11.3605 9.65688C11.3605 9.40931 11.2788 9.16169 11.1153 8.99665C10.9518 8.8316 10.7067 8.74903 10.3797 8.74903C10.0528 8.74903 9.80762 8.8316 9.56243 8.99665C9.39896 9.16169 9.23548 9.3267 9.23548 9.57428H8.74512C8.90858 9.07913 9.07203 8.8316 9.39895 8.58402Z" />
<path d="M16.7549 5.36549H0.408757C0.245295 5.36549 0.163574 5.28302 0.163574 5.11797C0.163574 4.95293 0.245295 4.87036 0.408757 4.87036H16.7549C16.9184 4.87036 17.0001 4.95293 17.0001 5.11797C16.9184 5.2005 16.8367 5.36549 16.7549 5.36549Z" />
</svg>`;

const smilingFaceSvg = (
  urgentColor: string
) => `<svg width="42" height="30" viewBox="0 0 42 30" fill="${urgentColor}" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 30C28.1787 30 34.2025 26.4333 35.8504 19.6839C35.8565 19.6839 35.8626 19.684 35.8687 19.684L35.8815 19.684C39.2606 19.684 42 16.4326 42 13.0131C42 9.59347 39.2606 6.34212 35.8815 6.34212C35.1872 6.34212 34.2355 6.26746 33.6134 6.48308C30.8962 2.18119 26.4195 0 21 0C15.5805 0 11.1038 2.18119 8.38659 6.48308C7.76452 6.26746 6.81281 6.34212 6.11852 6.34212C2.73935 6.34212 0 9.59347 0 13.0131C0 16.4326 2.73935 19.2047 6.11852 19.2047C6.12889 19.2047 6.13926 19.2047 6.14962 19.2047C7.79754 25.9541 13.8213 30 21 30Z"/>
          <path d="M32.6 15.5909C32.6 21.9924 27.4513 27.1818 21.1 27.1818C14.7487 27.1818 9.6 21.9924 9.6 15.5909C9.6 9.18943 14.7487 4 21.1 4C27.4513 4 32.6 9.18943 32.6 15.5909Z" stroke="white" stroke-width="0.5"/>
          <path d="M26.821 15.0094C26.9015 15.8146 26.8139 16.6278 26.5637 17.3968C26.3136 18.1657 25.9064 18.8733 25.3684 19.474C24.8305 20.0747 24.1737 20.5553 23.4403 20.8846C22.7069 21.214 21.9132 21.3849 21.1104 21.3864C20.3075 21.3878 19.5132 21.2198 18.7787 20.8931C18.0441 20.5664 17.3856 20.0883 16.8455 19.4895C16.3054 18.8908 15.8957 18.1846 15.6428 17.4166C15.3898 16.6486 15.2993 15.8357 15.377 15.0302L15.9879 15.0901C15.9185 15.8096 15.9993 16.5357 16.2253 17.2217C16.4512 17.9078 16.8172 18.5385 17.2996 19.0734C17.7821 19.6082 18.3703 20.0353 19.0264 20.3271C19.6826 20.619 20.3921 20.769 21.1093 20.7677C21.8264 20.7664 22.5354 20.6138 23.1905 20.3196C23.8456 20.0254 24.4323 19.5961 24.9128 19.0595C25.3933 18.5229 25.7571 17.8909 25.9805 17.204C26.204 16.5171 26.2823 15.7907 26.2103 15.0715L26.821 15.0094Z" stroke="white" stroke-width="0.5"/>
          <path d="M18.8 12.1136C18.8 12.7538 18.2851 13.2727 17.65 13.2727C17.0149 13.2727 16.5 12.7538 16.5 12.1136C16.5 11.4735 17.0149 10.9545 17.65 10.9545C18.2851 10.9545 18.8 11.4735 18.8 12.1136Z" stroke="white" stroke-width="0.5"/>
          <path d="M25.7 12.1136C25.7 12.7538 25.1851 13.2727 24.55 13.2727C23.9149 13.2727 23.4 12.7538 23.4 12.1136C23.4 11.4735 23.9149 10.9545 24.55 10.9545C25.1851 10.9545 25.7 11.4735 25.7 12.1136Z" stroke="white" stroke-width="0.5"/>
          <path d="M32.2489 17.8956C32.9559 17.9501 33.6658 17.8392 34.3233 17.5715C34.9807 17.3037 35.5678 16.8864 36.0388 16.3522C36.5097 15.8179 36.8518 15.1811 37.0382 14.4916C37.2246 13.8021 37.2503 13.0784 37.1134 12.3772C36.9764 11.676 36.6805 11.0162 36.2487 10.4493C35.8169 9.88244 35.2609 9.42385 34.6242 9.10937C33.9874 8.79488 33.2872 8.63302 32.5781 8.63642C31.8691 8.63981 31.1704 8.80838 30.5367 9.12895L31.705 11.4754C31.9799 11.3363 32.283 11.2632 32.5905 11.2617C32.8981 11.2602 33.2018 11.3305 33.478 11.4669C33.7542 11.6033 33.9953 11.8022 34.1826 12.0481C34.3699 12.2939 34.4983 12.5801 34.5577 12.8843C34.6171 13.1884 34.6059 13.5023 34.5251 13.8014C34.4442 14.1005 34.2959 14.3767 34.0916 14.6084C33.8873 14.8402 33.6326 15.0212 33.3475 15.1373C33.0623 15.2534 32.7544 15.3016 32.4477 15.2779L32.2489 17.8956Z" stroke="white" stroke-width="0.5"/>
          <path d="M9.9511 17.8956C9.2441 17.9501 8.53416 17.8392 7.87673 17.5715C7.21929 17.3037 6.63217 16.8864 6.16121 16.3522C5.69026 15.8179 5.34822 15.1811 5.16181 14.4916C4.9754 13.8021 4.94967 13.0784 5.08662 12.3772C5.22358 11.676 5.51952 11.0162 5.95132 10.4493C6.38312 9.88244 6.9391 9.42385 7.57583 9.10937C8.21256 8.79488 8.9128 8.63302 9.62186 8.63642C10.3309 8.63981 11.0296 8.80838 11.6633 9.12895L10.495 11.4754C10.2201 11.3363 9.91704 11.2632 9.60948 11.2617C9.30193 11.2602 8.9982 11.3305 8.72201 11.4669C8.44583 11.6033 8.20467 11.8022 8.01738 12.0481C7.83008 12.2939 7.70172 12.5801 7.64231 12.8843C7.58291 13.1884 7.59407 13.5023 7.67492 13.8014C7.75578 14.1005 7.90414 14.3767 8.10842 14.6084C8.3127 14.8402 8.56736 15.0212 8.85253 15.1373C9.13769 15.2534 9.44563 15.3016 9.75229 15.2779L9.9511 17.8956Z" stroke="white" stroke-width="0.5"/>
        </svg>`;

const urgentClockSvg = (
  urgentColor: string
) => `<svg width="17" height="17" viewBox="0 0 17 17" fill="${urgentColor}" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.49936 17C3.75934 17 0 13.1587 0 8.50005C0 3.75965 3.84107 0 8.49936 0C13.2394 0 16.9987 3.84138 16.9987 8.50005C17.0804 13.2405 13.2394 17 8.49936 17ZM8.49936 0.408655C4.08624 0.408655 0.408622 4.00484 0.408622 8.50005C0.408622 12.9135 4.00452 16.5913 8.49936 16.5913C12.9125 16.5913 16.5901 12.9953 16.5901 8.50005C16.5901 4.08657 12.9942 0.408655 8.49936 0.408655Z" />
        <path d="M5.88393 11.2788C5.80221 11.2788 5.72047 11.2789 5.72047 11.1971C5.63875 11.1154 5.63875 10.9519 5.72047 10.8702L7.76358 8.90871C7.84531 8.82698 8.00878 8.82698 8.0905 8.90871C8.17223 8.99044 8.17223 9.15382 8.0905 9.23555L6.04739 11.1971C5.96567 11.2789 5.96566 11.2788 5.88393 11.2788Z" />
        <path d="M8.49907 7.92789C8.33562 7.92789 8.25391 7.84621 8.25391 7.68275V2.37023C8.25391 2.20677 8.33562 2.125 8.49907 2.125C8.66252 2.125 8.74423 2.20677 8.74423 2.37023V7.68275C8.74423 7.84621 8.66252 7.92789 8.49907 7.92789Z" />
        <path d="M8.49953 9.39897C8.00919 9.39897 7.60059 8.99034 7.60059 8.49995C7.60059 8.00957 8.00919 7.60083 8.49953 7.60083C8.98988 7.60083 9.39848 8.00957 9.39848 8.49995C9.39848 8.99034 9.07161 9.39897 8.49953 9.39897ZM8.49953 8.00949C8.25436 8.00949 8.00921 8.25476 8.00921 8.49995C8.00921 8.74514 8.25436 8.99032 8.49953 8.99032C8.74471 8.99032 8.98986 8.74514 8.98986 8.49995C8.98986 8.25476 8.82643 8.00949 8.49953 8.00949Z" />
      </svg>`;

export const taskMarker = (isUrgentTask: boolean) => {
  const urgentColor = isUrgentTask ? '#D60080' : '#2E3192';
  return `<div class="mark_container">
    ${circleWithBalloonSvg(urgentColor)}
  </div>`;
};

export const balloonMarker = (properties: TaskProperties) => {
  const urgencyDateClass = properties.isUrgentTask
    ? 'task_date_text_urgent'
    : 'task_date_text';
  const urgencyCountClass = properties.isUrgentTask
    ? 'task_count_urgent'
    : 'task_count';
  const urgentColor = properties.isUrgentTask ? '#D60080' : '#2E3192';
  const submitUrgentClass = properties.isUrgentTask
    ? 'submit_button_urgent'
    : '';
  const submitDisabledClass = properties.isDisabled
    ? 'submit_button_disabled'
    : '';

  const authorizedMarker = `<div class="task_container">

  <div class="close_icon">
    ${crossSvg}
  </div>
  <div class="task_bio">
    <img src="${properties.recipient.avatar}" alt="${
    properties.recipient.name
  }" class="task_avatar"/>
    <div>
      <p class="task_recipient_name">
        ${properties.recipient.name}
      </p>
      <p class="task_recipient_phone">${properties.recipient.phone}</p>
    </div>
  </div>
  <div class="task_description_container">
    <p class="task_description task_description_hidden" >
      ${properties.description}
    </p>
    <button type="button" class="task_button">Читать</button>
  </div>
  <div class="task_icon_container">
    <div class="task_icon_date_count">
      <div class="task_box">
        ${urgentCalendarIconSvg(urgentColor)}
        <p class="${urgencyDateClass}">${properties.date}</p>
      </div>
      <div class="task_box">
        <p class="${urgencyCountClass}">${properties.category.points}</p>
        ${smilingFaceSvg(urgentColor)}
      </div>
    </div>
    <div class="task_box" >
      ${urgentClockSvg(urgentColor)}
      <p class="${urgencyDateClass}"</p>
    </div>
  </div>
  <div class="task_button_container">
    <button
      type="button"
      class="submit_button ${submitUrgentClass} ${submitDisabledClass}"
    >
      Откликнуться
    </button>
  </div>
</div>`;

  const notAuthorizedMarker = `<div class="task_container">
        <div class="close_icon">
          ${crossSvg}
        </div>
        <div class="task_bio">
          <img src="${properties.recipient.avatar}" alt="${
    properties.recipient.name
  }" class="task_avatar"/>
          <div>
            <p class="task_recipient_name">
               Нужна помощь
            </p>
            <p class="task_recipient_phone">+7 (000) ***-**-**</p>
          </div>
        </div>
        <div class="task_description_container">
          <p class="task_description task_description_hidden" >
            ${properties.category.title}
          </p>
          <button type="button" class="task_button">Читать</button>
        </div>
        <div class="task_icon_box">
          <p class="${urgencyCountClass}">${properties.category.count}</p>
          ${smilingFaceSvg(urgentColor)}
        </div>
        <div class="task_button_container">
          <button
            type="button"
            class="submit_button ${submitUrgentClass} ${submitDisabledClass}"
          >
            Откликнуться
          </button>
        </div>
      </div>`;

  return properties.isAuthorised ? authorizedMarker : notAuthorizedMarker;
};
