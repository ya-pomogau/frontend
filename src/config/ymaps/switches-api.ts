const switcherValue = import.meta.env.VITE_SUGGEST_SWITCHER;
// Преобразование строки в булево значение
export const YMAPS_SUGGEST_SWITCHER = switcherValue === 'true';
