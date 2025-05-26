import express from 'express';
import api from '..';
import { auth } from '../../lib/middleware/auth';
import { multerUpload } from '../../lib/middleware/multer';
import { adminController } from './admin.controller';

const router: express.Router = express.Router({ mergeParams: true });

router.post('/demo', api.http(adminController.demo));

// Blog routes
router.post('/registration', api.http(auth.validateUser), api.http(adminController.registration));
router.post('/blog', api.http(auth.validateUser), api.http(adminController.createBlog));
router.get('/blog', api.http(auth.validateUser), api.http(adminController.getAllBlogs));
router.put('/blog/:id', api.http(auth.validateUser), api.http(adminController.updateBlogById));
router.get('/blog/:id', api.http(auth.validateUser), api.http(adminController.getBlogById));
router.delete('/blog/:id', api.http(auth.validateUser), api.http(adminController.deleteBlogById));

// Category routes
router.post('/category', api.http(auth.validateUser), api.http(adminController.createCategory));
router.get('/category', api.http(auth.validateUser), api.http(adminController.getAllCategories));
router.put('/category/:id', api.http(auth.validateUser), api.http(adminController.updateCategoryById));
router.get('/category/:id', api.http(auth.validateUser), api.http(adminController.getCategoryById));
router.delete('/category/:id', api.http(auth.validateUser), api.http(adminController.deleteCategoryById));

export const adminRouter = router;