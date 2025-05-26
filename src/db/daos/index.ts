import { blogDao } from './t_blog';
import { CategoryDao } from './t_category';
import { EmailChangeDao } from './t_email_change';
import { EmailTemplateDao } from './t_email_template';
import { ForgetPasswordDao } from './t_forget_password';
import { MasterUserTypeDao } from './t_master_usertype';
import { ParagraphDao } from './t_paragraph';
import { ParagraphImageDao } from './t_paragraph_image';
import { UserMasterDao } from './t_user';
import { UserTypeRoleDao } from './t_usertype_role';

const userMasterDao = new UserMasterDao();
const masterUserTypeDao = new MasterUserTypeDao();
const userTypeRoleDao = new UserTypeRoleDao();
const forgetPasswordDao = new ForgetPasswordDao();
const emailTemplateDao = new EmailTemplateDao();
const emailChangeDao = new EmailChangeDao();
const categoryDao = new CategoryDao();
const paragraphDao = new ParagraphDao();
const paragraphImageDao = new ParagraphImageDao();

export {
  blogDao,
  categoryDao,
  emailChangeDao,
  emailTemplateDao,
  forgetPasswordDao,
  paragraphDao,
  paragraphImageDao,
  userMasterDao,
  masterUserTypeDao,
  userTypeRoleDao
};
