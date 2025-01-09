import { BaseDAO } from './Base';
import {  MODELS } from '../../constants';
import { Op } from 'sequelize';

export class UserMasterDao extends BaseDAO {
  constructor() {
    super(MODELS.t_user);
  }

  createUser(params: Object) {
    return this.create(params);
  }
 
  updateUser(params, where: { user_id: number }) {
    return this.update(params, { where: where });
  }

  userCount(obj?: { sub: string; status?: string }) {
    const query = {
      distinct: true
    };
    if (obj?.status) {
      query['where'] = { ...query['where'], status: obj?.status };
    }

    return this.count(query);
  }

  getUserByUsername(username: any) {
    const query = {
      attributes: [
        ['password', 'savedPassword'],
        ['user_id', 'id'],
        ['email_id', 'email']
      ],
      where: {
        username: username,
        status: 'A'
      },
      raw: true
    };

    return this.findOne(query);
  }

  isValidAdmin(id: any) {
    const query = {
      attributes: { exclude: ['password'] },
      where: {
        user_id: id,
        status: 'A'
      },
      raw: true
    };

    return this.findOne(query);
  }

  userInfo(obj: { value: string; name: string }) {
    const query = {
      where: {
        [obj.name]: obj.value
      },
      raw: true
    };

    return this.findOne(query);
  }
  bulkCreateUser(params: Object) {
    return this.bulkCreate(params);
  }

  getUser(obj: { sub: number; type: number }) {
    const query = {
      attributes: [['user_id', 'id']],
      raw: true,
      where: { user_id: obj?.sub }
    };
    return this.findOne(query);
  }

  getDetails(obj: { id }) {
    const attributes = [
      ['user_id', 'id'],
      ['first_name', 'firstName'],
      ['last_name', 'lastName'],
      ['email_id', 'email'],
      ['username', 'username'],
      ['status', 'status']
    ];
    const query = {
      attributes: attributes,
      raw: true,
      where: { user_id: obj.id }
    };
    return this.findOne(query);
  }

  getUsers(obj?: { limit?: number; start?: number; }) {
    const query = {
      attributes: [
        ['user_id', 'id'],
        ['first_name', 'firstName'],
        ['last_name', 'lastName'],
        ['username', 'username'],
        ['email_id', 'email'],
        ['status', 'status'],
      ],
      raw: true,
      order: [['user_id', 'desc']]
    };
    if (obj?.limit) {
      query['limit'] = obj.limit;
      const start = obj?.start || 1;
      query['offset'] = start == 0 ? start : (start - 1) * obj.limit;
    }
    return this.findAndCountAll(query);
  }

  getInfoById(obj: { id: number; key: string; value: string }) {
    const query = {
      where: {
        user_id: obj.id,
        [obj.key]: { [Op.ne]: obj.value }
      },
      raw: true
    };

    return this.findOne(query);
  }
}
