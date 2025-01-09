import { BaseDAO } from './Base';
import { MODELS } from '../../constants';
import { Op } from 'sequelize';

export class ForgetPasswordDao extends BaseDAO {
  constructor() {
    super(MODELS.t_forget_password);
  }

  public createForgetPassword(params) {
    return this.create(params);
  }
  public createBulkForgetPassword(params) {
    return this.bulkCreate(params);
  }

  public updateForgetPassword(params, where) {
    return this.update(params, { where: where });
  }

  
public getForgetPasswordByToken(token: string) {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1); // Subtract 1 hour from the current time

    const query = {
      attributes: [
        'id',
        ['user_id', 'userId'],
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
