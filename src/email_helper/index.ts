import { registration } from "../helper/registration";
import { resetPasswordRequest } from "../helper/reset_password_request";

export const getHtml = (data: { activity; values; user_body?; admin_body? }) => {
  switch (data.activity) {
    case 'registration':
      return registration(data.values, data.user_body, data.admin_body);
    case 'reset_password_request':
      return resetPasswordRequest(data.values, data.user_body, data.admin_body);
    default:
      break;
  }
};
