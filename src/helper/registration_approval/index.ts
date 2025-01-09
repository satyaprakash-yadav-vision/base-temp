import { getBody } from './body';

const registrationApproval = (values, user_body, admin_body) => {
  const user_html = getBody({ placeholders: values, body: user_body });

  return {
    user_html: user_html,
    admin_html: null
  };
};

export { registrationApproval };
