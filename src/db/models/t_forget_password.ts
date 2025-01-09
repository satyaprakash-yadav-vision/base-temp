import { Model, DataTypes } from 'sequelize';
import { MODELS, TABLES } from '../../constants';
import { DB_CONN } from '../dbConnection';

export default class ForgetPasswordModel extends Model {
  public id: number;
  public user_id: number;
  public token: number;
  public valid: number;
  public created_on: Date;
}

ForgetPasswordModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    token: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true,
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: DB_CONN,
    modelName: MODELS.t_forget_password,
    tableName: TABLES.t_forget_password,
    timestamps: true,
    createdAt:'created_on',
    updatedAt:false
  }
);

