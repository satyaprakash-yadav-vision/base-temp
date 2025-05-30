import { getAdminBody } from './admin_body';
import { getBody } from './body';

const registration = (values, user_body, admin_body) => {
  const user_html = getBody({ placeholders: values, body: user_body });

  return {
    user_html: user_html,
  };
};

export { registration };
