import { getBody } from './body';

const bankInfoMissing = (values, user_body, admin_body) => {
  const admin_html = getBody({ placeholders: values, body: admin_body });

  return {
    user_html: null,
    admin_html: admin_html
  };
};

export { bankInfoMissing };
