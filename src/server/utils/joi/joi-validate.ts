import { APP_CONSTANT } from '../../../constants';
import { ExtendedJoi as joi } from '../../utils/validation';
import { MESSAGES } from '../constants/messages';

const nameRegex = new RegExp(/^[a-zA-Z\s]*$/i);
const { STRING_PATTERN, OBJECT_MISSNG } = APP_CONSTANT.JOI_VALIDATION_TYPE;

export const joiValidate = {
  globalApi: {
    country: joi.object().keys({
      start: joi.number().optional().integer().min(1),
      limit: joi.number().min(1).optional().integer().min(1),
      status: joi.string().trim().valid('A', 'I').optional()
    }),
    skuById: joi.object().keys({
      id: joi.number().required().integer()
    })
  },
  userApi: {
    otp: joi.object().keys({
      email: joi.string().trim().required().email()
    }),
    userSignUp: joi.object().keys({
      email: joi.string().trim().required().email(),
      password: joi.string().trim().required()
    }),
    signIn: joi.object().keys({
      username: joi.string().trim().required(),
      password: joi.string().trim().required()
    }),
    id: joi.object().keys({
      id: joi.number().integer().required()
    }),
    verifyOtp: joi.object().keys({
      email: joi.string().trim().email().required(),
      otp: joi.number().integer().required()
    }),
    otpVerify: joi.object().keys({
      otp: joi.number().integer().required()
    }),
    refreshToken: joi.object().keys({
      refreshToken: joi.string().trim().required()
    }),
    changePassword: joi.object().keys({
      oldPassword: joi.string().trim().required(),
      newPassword: joi.string().trim().required(),
      confirmPassword: joi.string().trim().required()
    }),
    resetPassword: joi.object().keys({
      newPassword: joi.string().trim().required(),
      confirmPassword: joi.string().trim().required()
    }),
    forgotPassword: joi.object().keys({
      email: joi.string().trim().required().email()
    }),
    status: joi.object().keys({
      status: joi.string().trim().valid('A', 'I').optional(),
      valid: joi.boolean().optional()
    }),
    postProfile: joi
      .object()
      .keys({
        firstName: joi
          .string()
          .trim()
          .optional()
          .allow(null, '')
          .regex(nameRegex)
          .messages({
            [STRING_PATTERN]: 'only alphabet allowed in first name.'
          }),
        lastName: joi
          .string()
          .trim()
          .optional()
          .allow(null, '')
          .regex(nameRegex)
          .messages({
            [STRING_PATTERN]: 'only alphabet allowed in last name.'
          }),
        gender: joi.string().trim().required().valid('M', 'F', 'O'),
        phoneNo: joi.string().trim().required(),
        address: joi.string().trim().optional(),
        pinNo: joi.number().integer().optional(),
        city: joi.string().trim().optional(),
        // rest details
      }),
    editProfile: joi
      .object()
      .keys({
        firstName: joi
          .string()
          .trim()
          .optional()
          .allow(null, '')
          .regex(nameRegex)
          .messages({
            [STRING_PATTERN]: 'only alphabet allowed in first name.'
          }),
        lastName: joi
          .string()
          .trim()
          .optional()
          .allow(null, '')
          .regex(nameRegex)
          .messages({
            [STRING_PATTERN]: 'only alphabet allowed in last name.'
          }),
        phoneNo: joi.string().trim().optional().allow(null, ''),
        gender: joi.string().trim().optional().valid('M', 'F', 'O').allow(null, ''),
        city: joi.string().trim().optional().allow(null, ''),
        address: joi.string().trim().optional().allow(null, ''),
        pinNo: joi.number().integer().optional().allow(null, '')
      })
      .or(
        'firstName',
        'lastName',
        'phoneNo',
        'city',
        'gender',
        'address',
        'pinNo'
      )
      .required()
      .messages({
        [OBJECT_MISSNG]:
          'object must contain at least one of [ firstName, lastName, phoneNo, city, gender, address, pinNo ] for edit.'
      }),
  }
};
