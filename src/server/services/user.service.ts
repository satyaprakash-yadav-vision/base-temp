import { emailChangeDao, emailTemplateDao, forgetPasswordDao, userMasterDao, userTypeRoleDao } from '../../db/daos';
import { MESSAGES } from '../utils/constants/messages';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { customValidation } from '../utils/validation/customValidation';
import { CONSTANT_CONFIG } from '../../config/CONSTANT_CONFIG';
import { APP_CONSTANT } from '../../constants';
import { sendEmail } from '../utils/emailConfig';
import { getHtml } from '../../helper';
import { DB_CONN } from '../../db/dbConnection';

class UserService {
  async   userSignUp(object, options) {
    const { email, password } = object;
    let otp = null;

    if (customValidation.validateEmail(email)) {
      // generate the otp
      otp = Math.floor(100000 + Math.random() * 900000);
      // Get the current date and time
      let currentDate = new Date();

      // Add 10 minutes to the current date
      let futureDate = new Date(currentDate.getTime() + 10 * 60000); // 60000 milliseconds = 1 minute

      // Format the future date for display (optional step)
      let formattedDate = futureDate.toLocaleString(); // Adjust formatting as per your requirement

      // Log or use the formatted future date
      const encryptedPass = await bcrypt.hash(password, 10);

      const userObj = {
        otp,
        password: encryptedPass,
        otp_expires: formattedDate
      };
      const data = await userMasterDao.userInfo({ value: email, name: 'email_id' });
      // if data found then there will be three states
      // if status is A then user can login with his credentials
      // if status is P then user can login with his otp
      // if status is I then user can login with his action not allowed
      // if data not found create a new user and generate the otp
      if (data && data?.status === 'I') {
        throw new Error(MESSAGES.ERROR.ACTION_NOT_ALLOWED);
      }
      if (data && data?.status === 'A') {
        // login with credentials
        throw new Error(MESSAGES.ERROR.EMAIL_ALREADY_EXIST);
      }
      if (data && data?.status === 'P') {
        // if user exist then store the otp into table
        const updatedUser = await userMasterDao.updateUser(userObj, { user_id: data?.user_id });
      } else {
        // create the user just with email and otp
        userObj['status'] = 'P';
        userObj['email_id'] = email;
        // userObj['username'] = email;

        let createdUser = await userMasterDao.createUser(userObj);
        createdUser = JSON.stringify(createdUser);
        createdUser = JSON.parse(createdUser);
      }
    }
    // send otp to the user email
    if (otp) {
      try {
        await sendEmail({
          to: email,
          subject: 'Verify OTP',
          html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>OTP Email Template</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      background-color: #f0f0f0;
                      padding: 20px;
                  }
                  .container {
                      max-width: 600px;
                      margin: 0 auto;
                      background-color: #fff;
                      padding: 20px;
                      border-radius: 8px;
                      box-shadow: 0 0 10px rgba(0,0,0,0.1);
                  }
                  h2 {
                      text-align: center;
                  }
                  p {
                      margin-bottom: 1em;
                  }
                  .otp-code {
                      font-size: 24px;
                      font-weight: bold;
                      text-align: center;
                      background-color: #f0f0f0;
                      padding: 10px;
                      border-radius: 8px;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <h2>Your OTP for Login</h2>
                  <p>Please use the following OTP to proceed with your login:</p>
                  <div class="otp-code">${otp}</div>
                  <p>If you didn't request this OTP, please ignore this email.</p>
              </div>
          </body>
          </html>
      `
        });
      } catch (error) {
        throw new Error(error);
      }
    }
    return { message: MESSAGES.SUCCESS.OTP_SENT_SUCCESSFULLY };
  }
  async verifyOtp(object, options) {
    const { email, otp } = object;
    const data = await userMasterDao.userInfo({ value: email, name: 'email_id' });
    const currTime = new Date();
    if (!data || data?.otp != otp) {
      throw new Error(MESSAGES.ERROR.NOT_FOUND);
    }
    if (data?.otp_expires < currTime) {
      throw new Error(MESSAGES.ERROR.INVALID_PASS);
    }
    let userId = data?.user_id;
    // update the user here
    const updatedUser = await userMasterDao.updateUser({ status: 'A', username: email }, { user_id: userId });
    const userTypeObj = {
      user_id: userId,
      user_type_id: APP_CONSTANT.USER_TYPE_ID.PARTNER
    };
   
    //* Map user with Type
    await userTypeRoleDao.createUser(userTypeObj);
    
    const userTypeObjType = await userTypeRoleDao.getUserRoleByUserId(userId);
     // Authenticate user with jwt
     const accessToken = jwt.sign(
      { sub: userId, userType: userTypeObjType?.userType },
      CONSTANT_CONFIG.JWT.ACCESS_SECRET_KEY,
      {
        expiresIn: CONSTANT_CONFIG.JWT.ACCESS_TOKEN_EXPIRY
      }
    );

    // Refresh Token
    const refreshToken = jwt.sign(
      { sub: userId, userType: userTypeObjType?.userType },
      CONSTANT_CONFIG.JWT.REFRESH_SECRET_KEY,
      {
        expiresIn: CONSTANT_CONFIG.JWT.REFRESH_TOKEN_EXPIRY
      }
    );

    return {
      message: MESSAGES.SUCCESS.CREATED,
      data: {
        userId: userId,
        username: email,
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: CONSTANT_CONFIG.JWT.ACCESS_TOKEN_EXPIRY
      }
    };
  }
  async login(object, options) {
    const { username, password } = object;
    const isUserExist = await userMasterDao.getUserByUsername(username);
    if (!isUserExist) {
      throw new Error(MESSAGES.ERROR.NOT_FOUND);
    }
    const savedPassword = isUserExist?.savedPassword;
    const userId = isUserExist?.id;

    // User type
    const userTypeObj = await userTypeRoleDao.getUserRoleByUserId(userId);
    if (!userTypeObj) {
      throw new Error(MESSAGES.ERROR.ACTION_NOT_ALLOWED);
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, savedPassword);
    if (!passwordValid) {
      throw new Error(MESSAGES.ERROR.SIGNIN);
    }

    // Authenticate user with jwt
    const accessToken = jwt.sign(
      { sub: userId, userType: userTypeObj?.userType },
      CONSTANT_CONFIG.JWT.ACCESS_SECRET_KEY,
      {
        expiresIn: CONSTANT_CONFIG.JWT.ACCESS_TOKEN_EXPIRY
      }
    );

    // Refresh Token
    const refreshToken = jwt.sign(
      { sub: userId, userType: userTypeObj?.userType },
      CONSTANT_CONFIG.JWT.REFRESH_SECRET_KEY,
      {
        expiresIn: CONSTANT_CONFIG.JWT.REFRESH_TOKEN_EXPIRY
      }
    );

    return {
      message: MESSAGES.SUCCESS.SIGN_IN,
      data: {
        userId: userId,
        username: username,
        userType: userTypeObj?.userType,
        userTypeId: userTypeObj?.userTypeId,
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: CONSTANT_CONFIG.JWT.ACCESS_TOKEN_EXPIRY
      }
    };
  }
  async refreshToken(object, options) {
    const { refreshToken } = object;
    const secretKey = CONSTANT_CONFIG.JWT.REFRESH_SECRET_KEY;

    const decoded: any = jwt.verify(refreshToken, secretKey);
    if (!decoded) {
      throw new Error(MESSAGES.ERROR.JWT);
    }

    // Authenticate user with jwt
    const accessToken = jwt.sign({ sub: decoded.sub }, CONSTANT_CONFIG.JWT.ACCESS_SECRET_KEY, {
      expiresIn: CONSTANT_CONFIG.JWT.ACCESS_TOKEN_EXPIRY
    });

    return {
      message: MESSAGES.SUCCESS.TOKEN,
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: CONSTANT_CONFIG.JWT.ACCESS_TOKEN_EXPIRY
      }
    };
  }
  async changePassword(object, options) {
    const sub = options.locals?.auth.sub;
    const { oldPassword, newPassword, confirmPassword } = object;

    const user = await userMasterDao.userInfo({ value: sub, name: 'user_id' });
    if (!user) {
      throw new Error(MESSAGES.ERROR.NOT_FOUND);
    }

    if (newPassword !== confirmPassword) {
      throw new Error(MESSAGES.ERROR.INVALID_PASS);
    }

    const savedPassword = user?.password;

    // Verify password
    const passwordValid = await bcrypt.compare(oldPassword, savedPassword);
    if (!passwordValid) {
      throw new Error(MESSAGES.ERROR.INVALID_OLD_PASS);
    }
    // encrypt the pass                            salt-round
    const encryptedPass = await bcrypt.hash(newPassword, 10);

    await userMasterDao.updateUser({ password: encryptedPass }, { user_id: sub });
    return {
      message: MESSAGES.SUCCESS.PASS_CHANGED
    };
  }
  async forgotPassword(object, options) {
    const { email } = object;

    const user = await userMasterDao.userInfo({ value: email, name: 'email_id' });
    if (!user) {
      throw new Error(MESSAGES.ERROR.NOT_FOUND);
    }
    const userTypeObj = await userTypeRoleDao.getUserRoleByUserId(user?.user_id);
    if (!userTypeObj) {
      throw new Error(MESSAGES.ERROR.ACTION_NOT_ALLOWED);
    }

    // accessToken and refreshToken should contains userType
    const token = jwt.sign(
      { sub: user.user_id, userType: userTypeObj?.userType, type:'ForgotPassword' },
      CONSTANT_CONFIG.JWT.ACCESS_SECRET_KEY,
      {
        expiresIn: CONSTANT_CONFIG.JWT.FORGOT_TOKEN_EXPIRY
      }
    );

    const pageUrl = CONSTANT_CONFIG.PAGE_URL;
    const url = `${pageUrl}/reset-password?token=${token}`;
    const obj={
      user_id:user.user_id,
      token,
      valid:true,
    }
    // now store this obj into database
    const forgetData = await forgetPasswordDao.createForgetPassword(obj);
    // send mail
    const title = APP_CONSTANT.EMAIL_TITLES.RESET_PASSWORD_REQUEST;
    const emailTemplate = await emailTemplateDao.getEmailTemplateByTitle(title);

    const firstName = user?.first_name;
    const lastName = user?.last_name;

    const emailData = getHtml({
      activity: 'reset_password_request',
      values: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        resetPasswordLink: url
      },
      user_body: emailTemplate?.user_content
    });

    try {
      await sendEmail({
        to: email,
        subject: emailTemplate?.user_subject,
        html: emailData?.user_html
      });
    } catch (error) {
      throw new Error(error);
    }

    return {
      message: MESSAGES.SUCCESS.FORGOT_PASSWORD
    };
  }
  async changeEmail(object, options) {
    const {sub,userType} = options.locals?.auth;

    const user = await userMasterDao.isValidAdmin(sub);
    if (!user || !userType) {
      throw new Error(MESSAGES.ERROR.NOT_FOUND);
    }

    // accessToken and refreshToken should contains userType
    const token = jwt.sign(
      { sub, userType, type:'EmailChange' },
      CONSTANT_CONFIG.JWT.ACCESS_SECRET_KEY,
      {
        expiresIn: CONSTANT_CONFIG.JWT.FORGOT_TOKEN_EXPIRY
      }
    );

    const pageUrl = CONSTANT_CONFIG.PAGE_URL;
    const url = `${pageUrl}/change-email?token=${token}`;
    const obj={
      user_id:user.user_id,
      token,
      old_email:user.email_id,
      valid:true,
    }
    // now store this obj into database
    const forgetData = await emailChangeDao.createEmailChange(obj);
    // send mail
    const title = APP_CONSTANT.EMAIL_TITLES.RESET_PASSWORD_REQUEST;
    const emailTemplate = await emailTemplateDao.getEmailTemplateByTitle(title);

    const firstName = user?.first_name;
    const lastName = user?.last_name;

    try {
      await sendEmail({
        to: user.email_id,
        subject: "Email change request",
        html: `<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Change Email Address</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      background-color: #ffffff;
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #4CAF50;
      padding: 10px;
      color: #ffffff;
      text-align: center;
      font-size: 24px;
    }
    .content {
      margin-top: 20px;
      font-size: 16px;
      line-height: 1.6;
    }
    .footer {
      margin-top: 20px;
      font-size: 14px;
      text-align: center;
      color: #777777;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      Change Email Address
    </div>
    <div class="content">
      <p>Hello ${user.first_name} ${user.last_name},</p>
      <p>Please click on the link below to change your email address:</p>
      <p><a href=${url} class="button">Change Email</a></p>
      <p>If you did not make this request or believe this is an error, please contact our support team immediately.</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
        `
      });
    } catch (error) {
      throw new Error(error);
    }

    return {
      message: MESSAGES.SUCCESS.FORGOT_PASSWORD
    };
  }
  async otpForChangeEmail(object, options) {
    const {sub,userType,type} = options.locals?.auth;
    const token = options?.headers?.authorization?.split(" ")[1];
    if(!type || type !== 'EmailChange'){
      throw new Error(MESSAGES.ERROR.ACTION_NOT_ALLOWED);
    }
    const { email } = object;
    const user = await userMasterDao.isValidAdmin(sub);
    if (!user) {
      throw new Error(MESSAGES.ERROR.NOT_FOUND);
    }
    const userTypeObj = await userTypeRoleDao.getUserRoleByUserId(user?.user_id);
    if (!userTypeObj) {
      throw new Error(MESSAGES.ERROR.ACTION_NOT_ALLOWED);
    }
    // check for token exist
    const isTokenExist= await emailChangeDao.getEmailChangeByToken(token);
    if(!isTokenExist){
      throw new Error(MESSAGES.ERROR.ACTION_NOT_ALLOWED);
    }
    const isUsernameExist = await userMasterDao.userInfo({name:'email_id',value:email});
    if (isUsernameExist) {
      throw new Error(MESSAGES.ERROR.EMAIL_ALREADY_EXIST);
    }
    // update the emailchange 
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() + 1); // Subtract 1 hour from the current time

    const otp = Math.floor(100000 + Math.random() * 900000);
    const obj={
      new_email:email,
      otp,
      otp_expires:oneHourAgo,
    }
    const updateEmailchange = await emailChangeDao.updateEmailChange(obj,{id:isTokenExist.id});
    try {
      await sendEmail({
        to: email,
        subject: 'Email Change OTP',
        html: `
        <html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Change OTP</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      background-color: #ffffff;
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #4CAF50;
      padding: 10px;
      color: #ffffff;
      text-align: center;
      font-size: 24px;
    }
    .content {
      margin-top: 20px;
      font-size: 16px;
      line-height: 1.6;
    }
    .footer {
      margin-top: 20px;
      font-size: 14px;
      text-align: center;
      color: #777777;
    }
    .otp-code {
      font-size: 20px;
      font-weight: bold;
      color: #4CAF50;
      background-color: #f9f9f9;
      padding: 10px;
      border-radius: 4px;
      text-align: center;
      display: inline-block;
      margin-top: 20px;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      Email Change OTP
    </div>
    <div class="content">
      <p>Hello ${user.first_name} ${user.last_name},</p>
      <p>We received a request to change the email address for your account. To confirm this change, please use the following OTP:</p>
      <p class="otp-code">${otp}</p>
      <p>If you did not make this request, please ignore this email or contact our support team immediately.</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
    </div>
  </div>
</body>
</html>

        `
      });
    } catch (error) {
      throw new Error(error);
    }

    return {
      message: MESSAGES.SUCCESS.FORGOT_PASSWORD
    };
  }
  async verifyOtpForChangeEmail(object, options) {
    const {sub,userType,type} = options.locals?.auth;
    const { otp } = object;
    const token = options?.headers?.authorization?.split(" ")[1];

    const data = await emailChangeDao.getEmailChangeByToken(token);
    const currTime = new Date();
    if (!data || data?.otp != otp) {
      throw new Error(MESSAGES.ERROR.NOT_FOUND);
    }
    if (data?.otp_expires < currTime) {
      throw new Error(MESSAGES.ERROR.INVALID_TOKEN);
    }
    const isUsernameExist = await userMasterDao.userInfo({name:'email_id',value:data.new_email});
    if (isUsernameExist) {
      throw new Error(MESSAGES.ERROR.EMAIL_ALREADY_EXIST);
    }
    const updateUserEmail = await userMasterDao.updateUser({email_id:data.new_email}, { user_id: sub });  
    const updateEmailchange = await emailChangeDao.updateEmailChange({valid:false},{token});

    return {
      message: MESSAGES.SUCCESS.UPDATED,
    };
  }
  async resetPassword(object, options) {
    const {sub,type} = options.locals?.auth;
    if(!type || type !== 'ForgotPassword'){
      throw new Error(MESSAGES.ERROR.ACTION_NOT_ALLOWED);
    }
    const { newPassword, confirmPassword } = object;
    const user = await userMasterDao.userInfo({ value: sub, name: 'user_id' });
    if (!user) {
      throw new Error(MESSAGES.ERROR.NOT_FOUND);
    }
    const token = options?.headers?.authorization?.split(' ')[1];
    const isTokenExist = await forgetPasswordDao.getForgetPasswordByToken(token);
    if(!isTokenExist){
      throw new Error(MESSAGES.ERROR.SOMETHING_WENT_WRONG);
    }
    if (newPassword !== confirmPassword) {
      throw new Error(MESSAGES.ERROR.INVALID_PASS);
    }

    // encrypt the pass                            salt-round
    const encryptedPass = await bcrypt.hash(newPassword, 10);

    await userMasterDao.updateUser({ password: encryptedPass }, { user_id: sub });
    await forgetPasswordDao.updateForgetPassword({ valid: false }, { id: isTokenExist.id });
    return {
      message: MESSAGES.SUCCESS.PASS_CHANGED
    };
  }
  async postProfile(object, options) {
    const {
      firstName,
      lastName,
      gender,
      phoneNo,
      address,
      pinNo,
      city,
    } = object;
    const { sub, userType } = options.locals?.auth;
    if (userType !== 'PARTNER') {
      throw new Error(MESSAGES.ERROR.ADMIN_RIGHT);
    }
    let updatedBy = sub;
    let id = sub;

    const isValidAdmin = await userMasterDao.isValidAdmin(sub);
    if (!isValidAdmin) {
      throw new Error(MESSAGES.ERROR.ADMIN_RIGHT);
    }
    const sellerFieldsArray = {
      first_name: firstName,
      last_name: lastName,
      gender: gender,
      phone_no: phoneNo,
      address: address,
      pin_no: pinNo,
      city: city,
      update_by: updatedBy
    };
    const userCreated = await userMasterDao.updateUser(sellerFieldsArray, { user_id: sub });
    // here we can send the message for successful registration

    return { message: MESSAGES.SUCCESS.UPDATED };
  }
  async editProfile(object, options) {
    const body = object;
    const { sub, userType } = options.locals?.auth;
    if (userType !== 'PARTNER') {
      throw new Error(MESSAGES.ERROR.ADMIN_RIGHT);
    }
    let sellerFields = APP_CONSTANT.USER_FIELDS;
    let updatedBy = sub;

    const isValidAdmin = await userMasterDao.isValidAdmin(sub);
    if (!isValidAdmin) {
      throw new Error(MESSAGES.ERROR.ADMIN_RIGHT);
    }
    // do email verification
    if (body?.username) {
      const isEmailExist = await userMasterDao.userInfo({ name: 'username', value: body?.username });
      if (isEmailExist && isEmailExist?.user_id != sub) {
        throw new Error(MESSAGES.ERROR.USERNAME_ALREADY_EXIST);
      }
    }
    const userFieldsArray = {
      update_by: updatedBy
    };
    Object.keys(sellerFields).forEach(field => {
      const key = sellerFields[field];
      const value = object[field];
      if (value) {
        userFieldsArray[key] = value;
      }
    });
    const userUpdated = await userMasterDao.updateUser(userFieldsArray, { user_id: sub });

    return { message: MESSAGES.SUCCESS.UPDATED };
  }
  async getProfile(object, options) {
    const { sub, userType } = options.locals?.auth;
    if (!userType) {
      throw new Error(MESSAGES.ERROR.ADMIN_RIGHT);
    }

    const isValidAdmin = await userMasterDao.isValidAdmin(sub);
    if (!isValidAdmin) {
      throw new Error(MESSAGES.ERROR.ADMIN_RIGHT);
    }
    // send the user profile
    const userProfile = await userMasterDao.getDetails({id:sub});
    return { message: MESSAGES.SUCCESS.OK, data: userProfile };
  }
  async getUser(object, options) {
    const { sub, userType } = options.locals?.auth;
    if (userType !== 'ADMIN') {
      throw new Error(MESSAGES.ERROR.ADMIN_RIGHT);
    }

    const isValidAdmin = await userMasterDao.isValidAdmin(sub);
    if (!isValidAdmin) {
      throw new Error(MESSAGES.ERROR.ADMIN_RIGHT);
    }
    // GET ALL THE USER
    const userData = await userMasterDao.getUsers();

    return { message: MESSAGES.SUCCESS.OK, data:userData };
  }
  async getUserById(object, options) {
    const {id} = options.params;
    const { sub, userType } = options.locals?.auth;
    if (userType !== 'ADMIN') {
      throw new Error(MESSAGES.ERROR.ADMIN_RIGHT);
    }

    const isValidAdmin = await userMasterDao.isValidAdmin(sub);
    if (!isValidAdmin) {
      throw new Error(MESSAGES.ERROR.ADMIN_RIGHT);
    }
    // get user by id
    const userProfile = await userMasterDao.getDetails({id});
    return { message: MESSAGES.SUCCESS.OK, data: userProfile };
  }
}

export const userService = new UserService();
