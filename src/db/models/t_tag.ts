import { Model, DataTypes } from 'sequelize';
import { MODELS, TABLES } from '../../constants';
import { DB_CONN } from '../dbConnection';

export default class TagModel extends Model {
  public id: number;
  public name: string;
  public description: string;
  public valid: boolean;
  public created_on: Date;
  public updated_on: Date;
}

TagModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
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
    modelName: MODELS.t_tag,
    tableName: TABLES.t_tag,
    timestamps: true,
    createdAt: 'created_on',
    updatedAt: 'updated_on'
  }
);