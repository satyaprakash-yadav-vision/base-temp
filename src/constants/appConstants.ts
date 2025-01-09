interface JOI_VALIDATION_TYPE {
  ANY_ONLY: string;
  STRING_LENGTH: string;
  STRING_PATTERN: string;
  STRING_EMAIL: string;
  STRING_BASE: string;
  ARRAY_INCLUDE_REQUIRED: string;
  REQUIRED: string;
  OBJECT_MISSNG: string;
}
interface EMAIL_TITLES {
  REGISTRATION: string;
  REGISTRATION_APPROVAL: string;
  BANK_INFO_MISSING: string;
  RESET_PASSWORD_REQUEST: string;
}
interface USER_TYPE_ID {
  ADMIN: number;
  PARTNER: number;
}
interface USER_FIELDS {
  firstName: string;
  lastName: string;
  username: string;
  phoneNo: string;
  gender: string;
  city: string;
  address: string;
  pinNo: string;
}

interface IAppConstant {
  JOI_VALIDATION_TYPE: JOI_VALIDATION_TYPE;
  EMAIL_TITLES: EMAIL_TITLES;
  USER_TYPE_ID: USER_TYPE_ID;
  USER_FIELDS: USER_FIELDS;
}

export const APP_CONSTANT: IAppConstant = Object.freeze({
  JOI_VALIDATION_TYPE: {
    ANY_ONLY: 'any.only',
    STRING_LENGTH: 'string.length',
    STRING_PATTERN: 'string.pattern.base',
    STRING_EMAIL: 'string.email',
    STRING_BASE: 'string.base',
    ARRAY_INCLUDE_REQUIRED: 'array.includesRequiredUnknowns',
    REQUIRED: 'any.required',
    OBJECT_MISSNG: 'object.missing'
  },
  EMAIL_TITLES: {
    REGISTRATION: 'REGISTRATION',
    REGISTRATION_APPROVAL: 'REGISTRATION_APPROVAL',
    BANK_INFO_MISSING: 'BANK_INFO_MISSING',
    RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST'
  },
  USER_TYPE_ID: {
    ADMIN: 1,
    PARTNER: 2,
  },
   USER_FIELDS: {
    firstName: `first_name`,
    lastName: `last_name`,
    username: `username`,
    gender: `gender`,
    phoneNo: `phone_no`,
    city: `city`,
    address: `address`,
    pinNo: `pin_no`,
  },
});
