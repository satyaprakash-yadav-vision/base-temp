import { BaseDAO } from './Base';
import { MODELS } from '../../constants';

export class ParagraphDao extends BaseDAO {
  constructor() {
    super(MODELS.t_paragraph);
  }

  public createParagraph(params) {
    return this.create(params);
  }

  public createBulkParagraphs(params) {
    return this.bulkCreate(params);
  }

  public updateParagraph(params, where) {
    return this.update(params, { where: where });
  }

  public getParagraphById(id) {
    return this.findOne({ where: { id, valid: true } });
  }

  public getParagraphsByBlogId(blogId, options = {}) {
    const query = {
      where: { blog_id: blogId, valid: true },
      ...options
    };
    return this.findAll(query);
  }

  public deleteParagraph(id) {
    return this.update({ valid: false }, { where: { id } });
  }

  public deleteParagraphsByBlogId(blogId) {
    return this.update({ valid: false }, { where: { blog_id: blogId } });
  }
}

export const paragraphDao = new ParagraphDao();