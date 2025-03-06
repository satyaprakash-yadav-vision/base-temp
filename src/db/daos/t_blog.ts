import { BaseDAO } from './Base';
import { MODELS } from '../../constants';

export class BlogDao extends BaseDAO {
  constructor() {
    super(MODELS.t_blog);
  }

  public createBlog(params) {
    return this.create(params);
  }

  public createBulkBlog(params) {
    return this.bulkCreate(params);
  }

  public updateBlog(params, where) {
    return this.update(params, { where: where });
  }

  public getBlogById(id) {
    return this.findOne({ where: { id, valid: true } });
  }

  public getAllBlogs(options = {}) {
    const query = {
      where: { valid: true },
      ...options
    };
    return this.findAll(query);
  }

  public deleteBlog(id) {
    return this.update({ valid: false }, { where: { id } });
  }
}

export const blogDao = new BlogDao();