import express from 'express';
import api from '..';
import { userController } from './user.controller';
import { auth } from '../../lib/middleware/auth';
import { multerUpload } from '../../lib/middleware/multer';

const router: express.Router = express.Router({ mergeParams: true });

router.post('/signup', api.http(userController.userSignUp));
router.post('/verify-otp', api.http(userController.verifyOtp));
router.post('/login', api.http(userController.login));

router.post('/forgot-password', api.http(userController.forgotPassword)); // for all
router.post('/reset-password', api.http(auth.validateUser), api.http(userController.resetPassword)); // for all
router.post('/change-password',api.http(auth.validateUser),api.http(userController.changePassword));

router.get('/email-change', api.http(auth.validateUser), api.http(userController.changeEmail)); // for all
router.post('/email-otp', api.http(auth.validateUser), api.http(userController.otpForChangeEmail)); // for all
router.post('/email-verify', api.http(auth.validateUser), api.http(userController.verifyOtpForChangeEmail)); // for all

router.post('/refresh-token', api.http(userController.refreshToken));

router.post('/profile', api.http(auth.validateUser), api.http(userController.postProfile));
router.put('/profile', api.http(auth.validateUser), api.http(userController.editProfile));
router.get('/profile', api.http(auth.validateUser), api.http(userController.getProfile));
// get all user
router.get('/:id', api.http(auth.validateUser), api.http(userController.getUserById));
router.get('/', api.http(auth.validateUser), api.http(userController.getUser));
export const userRouter = router;
