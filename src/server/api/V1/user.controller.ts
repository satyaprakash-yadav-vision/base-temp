import { userService } from '../../services/user.service';
import { GlobalUtils } from '../../utils';
import { joiValidate } from '../../utils/joi/joi-validate';
import { responses as ModifiedResponse } from '../../utils/responses';
import { ApiValidator } from '../../utils/validation';

const controller = {
  userSignUp: async (object, options) => {
    const response = GlobalUtils.responseObject();

    try {
      await ApiValidator.validateBody(object, joiValidate.userApi.userSignUp);

      const userRes = await userService.userSignUp(object, options);

      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },

  verifyOtp: async (object, options) => {
    const response = GlobalUtils.responseObject();

    try {
      await ApiValidator.validateBody(object, joiValidate.userApi.verifyOtp);

      const userRes = await userService.verifyOtp(object, options);

      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  login: async (object, options) => {
    const response = GlobalUtils.responseObject();

    try {
      await ApiValidator.validateBody(object, joiValidate.userApi.signIn);

      const userRes = await userService.login(object, options);

      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  refreshToken: async (object, options) => {
    const response = GlobalUtils.responseObject();

    try {
      await ApiValidator.validateBody(object, joiValidate.userApi.refreshToken);

      const userRes = await userService.refreshToken(object, options);

      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },

  changePassword: async (object, options) => {
    const response = GlobalUtils.responseObject();

    try {
      await ApiValidator.validateBody(object, joiValidate.userApi.changePassword);

      const userRes = await userService.changePassword(object, options);

      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },

  forgotPassword: async (object, options) => {
    const response = GlobalUtils.responseObject();

    try {
      await ApiValidator.validateBody(object, joiValidate.userApi.forgotPassword);

      const userRes = await userService.forgotPassword(object, options);

      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  changeEmail: async (object, options) => {
    const response = GlobalUtils.responseObject();

    try {

      const userRes = await userService.changeEmail(object, options);

      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  otpForChangeEmail: async (object, options) => {
    const response = GlobalUtils.responseObject();

    try {
      await ApiValidator.validateBody(object, joiValidate.userApi.forgotPassword);

      const userRes = await userService.otpForChangeEmail(object, options);

      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  verifyOtpForChangeEmail: async (object, options) => {
    const response = GlobalUtils.responseObject();

    try {
      await ApiValidator.validateBody(object, joiValidate.userApi.otpVerify);

      const userRes = await userService.verifyOtpForChangeEmail(object, options);

      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  resetPassword: async (object, options) => {
    const response = GlobalUtils.responseObject();

    try {
      await ApiValidator.validateBody(object, joiValidate.userApi.resetPassword);

      const userRes = await userService.resetPassword(object, options);

      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  postProfile: async (object, options) => {
    const response = GlobalUtils.responseObject();

    try {
      await ApiValidator.validateBody(object, joiValidate.userApi.postProfile);
      const userRes = await userService.postProfile(object, options);

      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  editProfile: async (object, options) => {
    const response = GlobalUtils.responseObject();

    try {
      await ApiValidator.validateBody(object, joiValidate.userApi.editProfile);
      const userRes = await userService.editProfile(object, options);

      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  getProfile: async (object, options) => {
    const response = GlobalUtils.responseObject();

    try {
      const userRes = await userService.getProfile(object, options);

      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  getUser: async (object, options) => {
    const response = GlobalUtils.responseObject();

    try {
      const userRes = await userService.getUser(object, options);

      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  getUserById: async (object, options) => {
    const response = GlobalUtils.responseObject();

    try {
      await ApiValidator.validateParams(options.params, joiValidate.userApi.id);
      const userRes = await userService.getUserById(object, options);

      return ModifiedResponse.sendSuccess(response, userRes);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
};

export const userController = controller;
