import { userMasterDao } from '../../db/daos';
import { MESSAGES } from '../utils/constants/messages';
import _ from 'lodash';
import { customValidation } from '../utils/validation/customValidation';
import { CONSTANT_CONFIG } from '../../config/CONSTANT_CONFIG';
import { APP_CONSTANT } from '../../constants';

class AdminService {
  async demo(object, options) {

    return {
      message: MESSAGES.SUCCESS.CREATED,
      data: null
    };
  }
}

export const adminService = new AdminService();
