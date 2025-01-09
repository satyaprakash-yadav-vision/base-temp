import { bankInfoMissing } from './bank_info_missing';
import { registration } from './registration';
import { registrationApproval } from './registration_approval';
import { resetPasswordRequest } from './reset_password_request';

export const getHtml = (data: { activity; values; user_body?; admin_body? }) => {
  switch (data.activity) {
    case 'registration':
      return registration(data?.values, data?.user_body, data?.admin_body);
    case 'registration_approval':
      return registrationApproval(data?.values, data?.user_body, data?.admin_body);
    case 'bank_info_missing':
      return bankInfoMissing(data?.values, data?.user_body, data?.admin_body);
    case 'reset_password_request':
      return resetPasswordRequest(data?.values, data?.user_body, data?.admin_body);
    default:
      break;
  }
};
