import { BaseDAO } from './Base';
import { MODELS } from '../../constants';
import { Sequelize } from 'sequelize';
import UserTypeMasterModel from '../models/t_master_usertype';

export class UserTypeRoleDao extends BaseDAO {
  constructor() {
    super(MODELS.t_usertype_role);
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

  public getUserRoleByUserId(id) {
    const userTypeInclude = {
      attributes: [],
      model: UserTypeMasterModel,
      as: 'userTypeMapping',
      required: true
    };

    const query = {
      attributes: [
        ['user_type_id', 'userTypeId'],
        [Sequelize.col('userTypeMapping.user_type'), 'userType']
      ],
      where: {
        user_id: id
      },
      include: [userTypeInclude],
      raw: true
    };

    return this.findOne(query);
  }

  public getUserRolesByUserId(id) {
    const userTypeInclude = {
      attributes: [],
      model: UserTypeMasterModel,
      as: 'userTypeMapping',
      required: true
    };

    const query = {
      attributes: [
        ['user_type_id', 'userTypeId'],
        [Sequelize.col('userTypeMapping.user_type'), 'userType']
      ],
      where: {
        user_id: id
      },
      include: [userTypeInclude],
      raw: true
    };

    return this.findAll(query);
  }
}
