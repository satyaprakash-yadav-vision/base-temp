import { EmailChangeDao } from './t_email_change';
import { EmailTemplateDao } from './t_email_template';
import { ForgetPasswordDao } from './t_forget_password';
import { UserMasterDao } from './t_user';
import { UserTypeRoleDao } from './t_usertype_role';

const userMasterDao = new UserMasterDao();
const userTypeRoleDao = new UserTypeRoleDao();
const forgetPasswordDao = new ForgetPasswordDao();
const emailTemplateDao = new EmailTemplateDao();
const emailChangeDao = new EmailChangeDao();

export {
  userMasterDao,
  userTypeRoleDao,
  forgetPasswordDao,
  emailTemplateDao,
  emailChangeDao,
};
