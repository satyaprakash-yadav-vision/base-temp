import { BaseDAO } from './Base';
import { MODELS } from '../../constants';

export class MasterUserTypeDao extends BaseDAO {
  constructor() {
    super(MODELS.t_master_user_type);
  }

  public createUser(params) {
    return this.create(params);
  }
  public createBulkUser(params) {
    return this.bulkCreate(params);
  }

  public updateUser(params, where) {
    return this.update(params, { where: where });
  }
  public userInfo(obj:{name:string,value:string}){
    const query = {
      where: {
        [obj.name]: obj.value
      },
      raw: true
    };

    return this.findOne(query);
  }
}
