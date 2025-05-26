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
  registration: async (object, options) => {
    const response = GlobalUtils.responseObject();
    try {
      await ApiValidator.validateBody(object, joiValidate.userApi.registration);
      const result = await adminService.registration(object, options);
      return ModifiedResponse.sendSuccess(response, result);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  
  // Category CRUD operations
  createCategory: async (object, options) => {
    const response = GlobalUtils.responseObject();
    try {
      await ApiValidator.validateBody(object, joiValidate.categoryApi.createCategory);
      const result = await adminService.createCategory(object, options);
      return ModifiedResponse.sendSuccess(response, result);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  
  getAllCategories: async (object, options) => {
    const response = GlobalUtils.responseObject();
    try {
      const result = await adminService.getAllCategories(options);
      return ModifiedResponse.sendSuccess(response, result);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  
  getCategoryById: async (object, options) => {
    const response = GlobalUtils.responseObject();
    try {
      await ApiValidator.validateBody(object, joiValidate.categoryApi.getCategoryById);
      const result = await adminService.getCategoryById(object.id, options);
      return ModifiedResponse.sendSuccess(response, result);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  
  updateCategoryById: async (object, options) => {
    const response = GlobalUtils.responseObject();
    try {
      const { id, ...updateData } = object;
      await ApiValidator.validateBody({ id }, joiValidate.categoryApi.getCategoryById);
      await ApiValidator.validateBody(updateData, joiValidate.categoryApi.updateCategory);
      const result = await adminService.updateCategoryById(id, updateData, options);
      return ModifiedResponse.sendSuccess(response, result);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  
  deleteCategoryById: async (object, options) => {
    const response = GlobalUtils.responseObject();
    try {
      await ApiValidator.validateBody(object, joiValidate.categoryApi.getCategoryById);
      const result = await adminService.deleteCategoryById(object.id, options);
      return ModifiedResponse.sendSuccess(response, result);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  
  // Blog CRUD operations
  createBlog: async (object, options) => {
    const response = GlobalUtils.responseObject();
    try {
      await ApiValidator.validateBody(object, joiValidate.createBlogSchema);
      const result = await adminService.createBlog(object, options);
      return ModifiedResponse.sendSuccess(response, result);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },

  getAllBlogs: async (object, options) => {
    const response = GlobalUtils.responseObject();
    try {
      const result = await adminService.getAllBlogs(options);
      return ModifiedResponse.sendSuccess(response, result);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  
  getBlogById: async (object, options) => {
    const response = GlobalUtils.responseObject();
    try {
      await ApiValidator.validateBody(object, joiValidate.getBlogById);
      const result = await adminService.getBlogById(object.id, options);
      return ModifiedResponse.sendSuccess(response, result);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  
  updateBlogById: async (object, options) => {
    const response = GlobalUtils.responseObject();
    try {
      const { id, ...updateData } = object;
      await ApiValidator.validateBody({ id }, joiValidate.getBlogById);
      await ApiValidator.validateBody(updateData, joiValidate.updateBlogSchema);
      const result = await adminService.updateBlogById(id, updateData, options);
      return ModifiedResponse.sendSuccess(response, result);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  },
  
  deleteBlogById: async (object, options) => {
    const response = GlobalUtils.responseObject();
    try {
      await ApiValidator.validateBody(object, joiValidate.getBlogById);
      const result = await adminService.deleteBlogById(object.id, options);
      return ModifiedResponse.sendSuccess(response, result);
    } catch (err) {
      return ModifiedResponse.sendFailure(response, { message: err.message });
    }
  }
};

export const adminController = controller;