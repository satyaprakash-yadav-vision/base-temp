import { Model, DataTypes } from 'sequelize';
import { MODELS, TABLES } from '../../constants';
import { DB_CONN } from '../dbConnection';

export default class EmailTemplateModel extends Model {
  public id: number;
  public title: string;
  public user_subject: string;
  public admin_subject: string;
  public admin_content: string;
  public user_content: string;
  public bcc: string;
  public cc: string;
  public from: string;
  public to: string;
  public is_active: string;
  public updated_on: Date;
  public created_on: Date;
}

EmailTemplateModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin_subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin_content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    bcc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    from: {
      type: DataTypes.STRING,
      allowNull: true
    },
    to: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_active: {
      type: DataTypes.ENUM('A', 'I'),
      allowNull: false,
      defaultValue: 'A'
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_on: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize: DB_CONN,
    modelName: MODELS.t_email_template,
    tableName: TABLES.t_email_template,
    timestamps: true,
    createdAt: 'created_on',
    updatedAt: 'updated_on'
  }
);
