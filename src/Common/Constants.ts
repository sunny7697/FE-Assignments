export const inputErrMsg = (field: string) => `Please enter valid a ${field}`;
export const REGEX = {
  MOBILE: /^[+0-9\s]+$/,
  NAME: /^[\.a-zA-Z0-9\s]+$/,
};

export const DUPLICATE_PHONE_SERVER_ERROR =
  'Uniqueness violation. duplicate key value violates unique constraint "phone_number_key"';

export const DUPLICATE_PHONE_CLIENT_ERROR = 'Phone number is already added.';

export const DEFAULT_ERROR = 'Something went wrong. Please try again!';

export const TOAST_INITIAL_STATE = { message: '', open: false, type: '' };
