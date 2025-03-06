import { BaseDAO } from './Base';
import { MODELS } from '../../constants';

export class ParagraphImageDao extends BaseDAO {
  constructor() {
    super(MODELS.t_paragraph_image);
  }

  public createParagraphImage(params) {
    return this.create(params);
  }

  public createBulkParagraphImages(params) {
    return this.bulkCreate(params);
  }

  public updateParagraphImage(params, where) {
    return this.update(params, { where: where });
  }

  public getParagraphImageById(id) {
    return this.findOne({ where: { id, valid: true } });
  }

  public getParagraphImagesByParagraphId(paragraphId, options = {}) {
    const query = {
      where: { paragraph_id: paragraphId, valid: true },
      ...options
    };
    return this.findAll(query);
  }

  public deleteParagraphImage(id) {
    return this.update({ valid: false }, { where: { id } });
  }

  public deleteParagraphImageByParagraphId(paragraphId) {
    return this.update({ valid: false }, { where: { paragraph_id: paragraphId } });
  }
}

export const paragraphImageDao = new ParagraphImageDao();