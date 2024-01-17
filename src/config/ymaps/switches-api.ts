/* eslint-disable prettier/prettier */
// export const YMAPS_SUGGEST_SWITCHER = process.env.REACT_APP_SUGGEST_SWITCHER;

const switcherValue = process.env.REACT_APP_SUGGEST_SWITCHER;
// Преобразование строки в булево значение
export const YMAPS_SUGGEST_SWITCHER = switcherValue === 'true';
console.log(YMAPS_SUGGEST_SWITCHER);
console.log(`Это env ${typeof process.env.REACT_APP_SUGGEST_SWITCHER}`);
console.log(process.env);
