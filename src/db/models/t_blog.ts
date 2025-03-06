import { Model, DataTypes } from 'sequelize';
import { MODELS, TABLES } from '../../constants';
import { DB_CONN } from '../dbConnection';
import CategoryModel from './t_category';

export default class BlogModel extends Model {
  public id: number;
  public title: string;
  public content: string;
  public category_id: number;
  public image: string;
  public image_title: string;
  public status: string;
  public valid: boolean;
  public created_on: Date;
  public updated_on: Date;
}

BlogModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CategoryModel,
        key: 'id'
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image_title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'active'
    },
    valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize: DB_CONN,
    modelName: MODELS.t_blog,
    tableName: TABLES.t_blog,
    timestamps: true,
    createdAt: 'created_on',
    updatedAt: 'updated_on'
  }
);

// Define the relationship with Category
BlogModel.belongsTo(CategoryModel, {
  foreignKey: 'category_id',
  as: 'category'
});

CategoryModel.hasMany(BlogModel, {
  foreignKey: 'category_id',
  as: 'blogs'
});