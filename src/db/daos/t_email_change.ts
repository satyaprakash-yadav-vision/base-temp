import { BaseDAO } from './Base';
import { MODELS } from '../../constants';
import { Op } from 'sequelize';

export class EmailChangeDao extends BaseDAO {
  constructor() {
    super(MODELS.t_email_change);
  }

  public createEmailChange(params) {
    return this.create(params);
  }
  public createBulkEmailChange(params) {
    return this.bulkCreate(params);
  }

  public updateEmailChange(params, where) {
    return this.update(params, { where: where });
  }


  public getEmailChangeByToken(token: string) {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1); // Subtract 1 hour from the current time

    const query = {
      attributes: [
        'id',
        ['user_id', 'userId'],
        'token',
        'otp',
        'otp_time',
        'old_email',
        'new_email',
        'created_on',
      ],
      where: {
        token,
        valid: true,
        created_on: {
          [Op.gte]: oneHourAgo // Check if created_on is within the last hour
        }
      },
      raw: true
    };

    return this.findOne(query);
  }

}
