import { getAdminBody } from './admin_body';
import { getBody } from './body';

const registration = (values, user_body, admin_body) => {
  const user_html = getBody({ placeholders: values, body: user_body });
  const admin_html = getAdminBody({ placeholders: values, body: admin_body });

  return {
    user_html: user_html,
    admin_html: admin_html
  };
};

export { registration };
