import express from 'express';
import api from '..';
import { userRouter } from './user.routers';
import { commonRouter } from './common.router';
import { adminRouter } from './admin.routers';
const router: express.Router = express.Router({ mergeParams: true });

router.use('/admin', adminRouter);
router.use('/user', userRouter);
router.get('/key', api.http(commonRouter.getKey));
router.get('/ping', api.http(commonRouter.ping));

export const V1Router = router;
