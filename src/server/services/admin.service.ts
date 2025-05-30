import {
  userMasterDao,
  categoryDao,
  blogDao,
  paragraphDao,
  paragraphImageDao,
  masterUserTypeDao,
  userTypeRoleDao,
  emailTemplateDao
} from '../../db/daos';
import { MESSAGES } from '../utils/constants/messages';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import { APP_CONSTANT } from '../../constants';
import { getHtml } from '../../email_helper';
import { sendEmail } from '../utils/emailConfig';

class AdminService {
  async demo(object, options) {
    return {
      message: MESSAGES.SUCCESS.CREATED,
      data: null
    };
  }
  async registration(object, options) {
    const { firstName, lastName, email, password, userType } = object;
    // check for email already exist or not
    const isEmailExist = await userMasterDao.userInfo({ name: 'email_id', value: email });
    if (isEmailExist) {
      // throw error that user alredy exist
      throw Error(MESSAGES.ERROR.EMAIL_ALREADY_EXIST);
    }
    // check if userType exist or not
    const isUserTypeExist = await masterUserTypeDao.userInfo({ name: 'user_type_id', value: userType });
    if (!isUserTypeExist) {
      throw Error(MESSAGES.ERROR.INVALID_USER_TYPE);
    }
    const encryptedPass = await bcrypt.hash(password, 10);
    const userData = {
      first_name: firstName,
      last_name: lastName,
      email_id: email,
      username:email,
      password: encryptedPass,
      status:'A',
      valid:true,
    };
    const userCreated = await userMasterDao.createUser(userData);
    // create userType
    const userTypeObj = {
      user_id: userCreated.user_id,
      user_type_id: userType
    };

    //* Map user with Type
    await userTypeRoleDao.createUser(userTypeObj);
    // send email along with password
    const title = APP_CONSTANT.EMAIL_TITLES.REGISTRATION;
    const emailTemplate = await emailTemplateDao.getEmailTemplateByTitle(title);
    const bcc = emailTemplate?.bcc;

    const emailData = getHtml({
      activity: 'registration',
      values: {
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email
      },
      user_body: emailTemplate?.user_content
    });

    try {
      await sendEmail({
        to: email,
        bcc: bcc,
        subject: emailTemplate?.user_subject,
        html: emailData?.user_html
      });
    } catch (error) {
      throw new Error(error);
    }
    return {
      message: MESSAGES.SUCCESS.CREATED
    };
  }

  // Category CRUD operations
  async createCategory(payload, options) {
    const categoryData = await categoryDao.createCategory(payload);
    return {
      message: MESSAGES.SUCCESS.CREATED,
      data: categoryData
    };
  }

  async getAllCategories(options) {
    const categories = await categoryDao.findAll({ where: { valid: true } });
    return {
      message: MESSAGES.SUCCESS.OK,
      data: categories
    };
  }

  async getCategoryById(id, options) {
    const category = await categoryDao.findOne({ where: { id, valid: true } });
    if (!category) {
      throw new Error('Category not found');
    }
    return {
      message: MESSAGES.SUCCESS.OK,
      data: category
    };
  }

  async updateCategoryById(id, payload, options) {
    const category = await categoryDao.findOne({ where: { id, valid: true } });
    if (!category) {
      throw new Error('Category not found');
    }
    await categoryDao.updateCategory(payload, { id });
    const updatedCategory = await categoryDao.findOne({ where: { id } });
    return {
      message: MESSAGES.SUCCESS.UPDATED,
      data: updatedCategory
    };
  }

  async deleteCategoryById(id, options) {
    const category = await categoryDao.findOne({ where: { id, valid: true } });
    if (!category) {
      throw new Error('Category not found');
    }
    await categoryDao.update({ valid: false }, { where: { id } });
    return {
      message: MESSAGES.SUCCESS.DELETED,
      data: null
    };
  }

  // Blog CRUD operations
  async createBlog(payload, options) {
    // Verify category exists
    const category = await categoryDao.findOne({
      where: { id: payload.category_id, valid: true }
    });

    if (!category) {
      throw new Error('Category not found');
    }

    // Extract paragraphs and save blog data
    const { paragraphs, ...blogPayload } = payload;
    const blogData = await blogDao.createBlog(blogPayload);

    // Create paragraphs if provided
    if (paragraphs && Array.isArray(paragraphs) && paragraphs.length > 0) {
      for (let i = 0; i < paragraphs.length; i++) {
        const paragraph = paragraphs[i];
        // Add blog_id and order to paragraph
        const paragraphData = {
          blog_id: blogData.id,
          content: paragraph.content,
          order: i
        };

        // Create paragraph
        const createdParagraph = await paragraphDao.createParagraph(paragraphData);

        // Create paragraph image if provided
        if (paragraph.image) {
          await paragraphImageDao.createParagraphImage({
            paragraph_id: createdParagraph.id,
            image_url: paragraph.image.url,
            title: paragraph.image.title || null,
            description: paragraph.image.description || null
          });
        }
      }
    }

    // Get the complete blog with paragraphs and images
    const completeBlog = await this.getBlogWithRelations(blogData.id);

    return {
      message: MESSAGES.SUCCESS.CREATED,
      data: completeBlog
    };
  }

  async getAllBlogs(options) {
    const blogs = await blogDao.getAllBlogs();

    // Get complete blogs with paragraphs and images
    const blogsWithRelations = await Promise.all(
      blogs.map(blog => this.getBlogWithRelations(blog.id))
    );

    return {
      message: MESSAGES.SUCCESS.OK,
      data: blogsWithRelations
    };
  }

  async getBlogById(id, options) {
    const blog = await this.getBlogWithRelations(id);
    if (!blog) {
      throw new Error('Blog not found');
    }
    return {
      message: MESSAGES.SUCCESS.OK,
      data: blog
    };
  }

  // Helper method to get blog with paragraphs and images
  async getBlogWithRelations(id) {
    const blog = await blogDao.getBlogById(id);
    if (!blog) {
      return null;
    }

    // Get paragraphs for this blog
    const paragraphs = await paragraphDao.getParagraphsByBlogId(id, {
      order: [['order', 'ASC']]
    });

    // Get images for each paragraph
    const paragraphsWithImages = await Promise.all(
      paragraphs.map(async paragraph => {
        const images = await paragraphImageDao.getParagraphImagesByParagraphId(paragraph.id);
        return {
          ...paragraph.toJSON(),
          image: images.length > 0 ? images[0].toJSON() : null
        };
      })
    );

    // Return blog with paragraphs and images
    return {
      ...blog.toJSON(),
      paragraphs: paragraphsWithImages
    };
  }

  async updateBlogById(id, payload, options) {
    // Verify blog exists
    const blog = await blogDao.getBlogById(id);
    if (!blog) {
      throw new Error('Blog not found');
    }

    // If category_id is being updated, verify the new category exists
    if (payload.category_id) {
      const category = await categoryDao.findOne({
        where: { id: payload.category_id, valid: true }
      });

      if (!category) {
        throw new Error('Category not found');
      }
    }

    // Extract paragraphs from payload
    const { paragraphs, ...blogPayload } = payload;

    // Update blog data
    await blogDao.updateBlog(blogPayload, { id });

    // Update paragraphs if provided
    if (paragraphs && Array.isArray(paragraphs)) {
      // Get existing paragraphs
      const existingParagraphs = await paragraphDao.getParagraphsByBlogId(id);
      const existingParagraphsMap = new Map();
      existingParagraphs.forEach(p => existingParagraphsMap.set(p.id, p));

      // Process each paragraph in the payload
      for (let i = 0; i < paragraphs.length; i++) {
        const paragraph = paragraphs[i];

        if (paragraph.id) {
          // Update existing paragraph
          if (existingParagraphsMap.has(paragraph.id)) {
            await paragraphDao.updateParagraph(
              {
                content: paragraph.content,
                order: i
              },
              { id: paragraph.id }
            );

            // Update or create paragraph image
            if (paragraph.image) {
              const existingImage = await paragraphImageDao.getParagraphImagesByParagraphId(
                paragraph.id
              );

              if (existingImage.length > 0) {
                // Update existing image
                await paragraphImageDao.updateParagraphImage(
                  {
                    image_url: paragraph.image.url,
                    title: paragraph.image.title || null,
                    description: paragraph.image.description || null
                  },
                  { id: existingImage[0].id }
                );
              } else {
                // Create new image
                await paragraphImageDao.createParagraphImage({
                  paragraph_id: paragraph.id,
                  image_url: paragraph.image.url,
                  title: paragraph.image.title || null,
                  description: paragraph.image.description || null
                });
              }
            }

            // Remove from map to track which ones were processed
            existingParagraphsMap.delete(paragraph.id);
          }
        } else {
          // Create new paragraph
          const newParagraph = await paragraphDao.createParagraph({
            blog_id: id,
            content: paragraph.content,
            order: i
          });

          // Create paragraph image if provided
          if (paragraph.image) {
            await paragraphImageDao.createParagraphImage({
              paragraph_id: newParagraph.id,
              image_url: paragraph.image.url,
              title: paragraph.image.title || null,
              description: paragraph.image.description || null
            });
          }
        }
      }

      // Delete paragraphs that were not in the update payload
      for (const [paragraphId, paragraph] of existingParagraphsMap.entries()) {
        // First delete associated images
        await paragraphImageDao.deleteParagraphImageByParagraphId(paragraphId);
        // Then delete paragraph
        await paragraphDao.deleteParagraph(paragraphId);
      }
    }

    // Get updated blog with relations
    const updatedBlog = await this.getBlogWithRelations(id);

    return {
      message: MESSAGES.SUCCESS.UPDATED,
      data: updatedBlog
    };
  }

  async deleteBlogById(id, options) {
    const blog = await blogDao.getBlogById(id);
    if (!blog) {
      throw new Error('Blog not found');
    }

    // Get all paragraphs for this blog
    const paragraphs = await paragraphDao.getParagraphsByBlogId(id);

    // Delete all paragraph images and paragraphs
    for (const paragraph of paragraphs) {
      await paragraphImageDao.deleteParagraphImageByParagraphId(paragraph.id);
    }

    // Delete all paragraphs
    await paragraphDao.deleteParagraphsByBlogId(id);

    // Delete the blog
    await blogDao.deleteBlog(id);

    return {
      message: MESSAGES.SUCCESS.DELETED,
      data: null
    };
  }
}

export const adminService = new AdminService();
