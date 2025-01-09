import { BaseDAO } from './Base';
import { MODELS } from '../../constants';

export class EmailTemplateDao extends BaseDAO {
  constructor() {
    super(MODELS.t_email_template);
  }

  getEmailTemplateByTitle(title) {
    const query = {
      attributes: [
        'user_subject',
        'admin_subject',
        'admin_content',
        'user_content',
        'bcc',
        'cc',
        'to',
        'from'
      ],
      where: { title: title, is_active: 'A' },
      raw: true
    };
    return this.findOne(query);
  }
}
