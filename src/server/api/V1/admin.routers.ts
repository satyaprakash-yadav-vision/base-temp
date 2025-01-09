import express from 'express';
import api from '..';
import { auth } from '../../lib/middleware/auth';
import { multerUpload } from '../../lib/middleware/multer';
import { adminController } from './admin.controller';

const router: express.Router = express.Router({ mergeParams: true });

router.post('/demo', api.http(adminController.demo));
export const adminRouter = router;
