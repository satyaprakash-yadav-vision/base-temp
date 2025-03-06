import { Model, DataTypes } from 'sequelize';
import { MODELS, TABLES } from '../../constants';
import { DB_CONN } from '../dbConnection';
import BlogModel from './t_blog';

export default class ParagraphModel extends Model {
  public id: number;
  public blog_id: number;
  public content: string;
  public order: number;
  public valid: boolean;
  public created_on: Date;
  public updated_on: Date;
}

ParagraphModel.init(
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize: DB_CONN,
    modelName: MODELS.t_paragraph,
    tableName: TABLES.t_paragraph,
    timestamps: true,
    createdAt: 'created_on',
    updatedAt: 'updated_on'
  }
);