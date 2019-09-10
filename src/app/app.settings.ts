export const appSettings = {
  EMAIL_REG_EXP: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PASSWORD_REG_EXP: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{6,20}$/,
  STRONG_PASS_REGEXP: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\S]*$/,
  DATE_REG_EXP: /^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19[4-9][0-9])|(20(0[0-9])|(1[0-7]))$/,
  NUMBER_REG_EXP: /^[0-9]*$/,
  IMAGE_TYPES: ['image/jpg', 'image/jpeg', 'image/png'],
  MAX_FIlE_SIZE: 5242880, // 5MB
  lifeTime: 3000,
  errorMessage: 'Something went wrong.',
  cultureName: 'culture',
  langList: ['en'],
  langRegex: /^en$/,
  DEFAULT_LANGUAGE: 'en',
  SUCCESS_LIFE_CYCLE: 7000,
  ERROR_LIFE_CYCLE: 7000,
  SERVER_ERROR_MESSAGE: 'Something went wrong. Please contact support at support@GIZ.com.',
  NATURE_ITEMS_GET_COUNT: 500000, /*This is for getting all nature items*/
  NATURE_ITEMS_GET_PAGE: 0, /*This is for getting all nature items*/
  IMAGE_SOURCE: '/NatureImage/'
};
