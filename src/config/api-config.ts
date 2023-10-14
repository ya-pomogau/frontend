export const API_URL = 'http://localhost:3001';

export const host =
  process.env.REACT_APP_MODE === 'production'
    ? process.env.REACT_APP_HOST_PROD
    : process.env.REACT_APP_HOST_LOCAL;
