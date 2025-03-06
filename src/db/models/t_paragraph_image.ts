import { Model, DataTypes } from 'sequelize';
import { MODELS, TABLES } from '../../constants';
import { DB_CONN } from '../dbConnection';
import ParagraphModel from './t_paragraph';

export default class ParagraphImageModel extends Model {
  public id: number;
  public paragraph_id: number;
  public image_url: string;
  public title: string;
  public description: string;
  public valid: boolean;
  public created_on: Date;
  public updated_on: Date;
}

ParagraphImageModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    paragraph_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ParagraphModel,
        key: 'id'
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize: DB_CONN,
    modelName: MODELS.t_paragraph_image,
    tableName: TABLES.t_paragraph_image,
    timestamps: true,
    createdAt: 'created_on',
    updatedAt: 'updated_on'
  }
);