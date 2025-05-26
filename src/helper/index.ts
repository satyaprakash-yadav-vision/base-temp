import { registration } from './registration';
import { resetPasswordRequest } from './reset_password_request';

export const getHtml = (data: { activity; values; user_body?; admin_body? }) => {
  switch (data.activity) {
    case 'registration':
      return registration(data?.values, data?.user_body, data?.admin_body);
    case 'registration_approval':
      return resetPasswordRequest(data?.values, data?.user_body, data?.admin_body);
    default:
      break;
  }
};
