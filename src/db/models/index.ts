import BlogModel from './t_blog';
import BlogTagModel from './t_blog_tag';
import CategoryModel from './t_category';
import EmailChangeModel from './t_email_change';
import ForgetPasswordModel from './t_forget_password';
import UserTypeMasterModel from './t_master_usertype';
import ParagraphModel from './t_paragraph';
import ParagraphImageModel from './t_paragraph_image';
import TagModel from './t_tag';
import UserModel from './t_user';
import UserTypeRoleModel from './t_usertype_role';

const MODELS = {
  UserModel,
  UserTypeMasterModel,
  UserTypeRoleModel,
  ForgetPasswordModel,
  EmailChangeModel,
  CategoryModel,
  BlogModel,
  TagModel,
  ParagraphModel,
  ParagraphImageModel,
  BlogTagModel,
};

import { setupAssociations } from './associations';

// Setup all model associations
setupAssociations();

export { MODELS };
