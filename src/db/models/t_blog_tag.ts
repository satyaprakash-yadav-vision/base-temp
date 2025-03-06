import { Model, DataTypes } from 'sequelize';
import { MODELS, TABLES } from '../../constants';
import { DB_CONN } from '../dbConnection';
import BlogModel from './t_blog';
import TagModel from './t_tag';

export default class BlogTagModel extends Model {
  public id: number;
  public blog_id: number;
  public tag_id: number;
  public created_on: Date;
  public updated_on: Date;
}

BlogTagModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: BlogModel,
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TagModel,
        key: 'id'
      }
    }
  },
  {
    sequelize: DB_CONN,
    modelName: MODELS.t_blog_tag,
    tableName: TABLES.t_blog_tag,
    timestamps: true,
    createdAt: 'created_on',
    updatedAt: 'updated_on'
  }
);