import { adminService } from '../../services/admin.service';
import { GlobalUtils } from '../../utils';
import { joiValidate } from '../../utils/joi/joi-validate';
import { responses as ModifiedResponse } from '../../utils/responses';
import { ApiValidator } from '../../utils/validation';

const controller = {
 
  demo: async (object, options) => {
    const response = GlobalUtils.responseObject();
    try {
      await ApiValidator.validateBody(object, joiValidate.userApi.id);
      const userRes = await adminService.demo(object, options);
      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  
};

export const adminController = controller;
