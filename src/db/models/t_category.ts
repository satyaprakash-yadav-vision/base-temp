import { Model, DataTypes } from 'sequelize';
import { MODELS, TABLES } from '../../constants';
import { DB_CONN } from '../dbConnection';

export default class CategoryModel extends Model {
  public id: number;
  public name: string;
  public description: string;
  public image: string;
  public valid: boolean;
  public created_on: Date;
  public updated_on: Date;
}

CategoryModel.init(

  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize: DB_CONN,
    modelName: MODELS.t_category,
    tableName: TABLES.t_category,
    timestamps: true,
    createdAt: 'created_on',
    updatedAt: 'updated_on'
  }
);
