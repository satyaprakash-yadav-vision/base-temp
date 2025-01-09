import { Model, DataTypes } from 'sequelize';
import { MODELS, TABLES } from '../../constants';
import { DB_CONN } from '../dbConnection';

export default class EmailChangeModel extends Model {
  public id: number;
  public user_id: number;
  public token: string;
  public otp: number;
  public otp_time: Date;
  public old_email: string;
  public new_email: string;
  public valid: number;
  public created_on: Date;
}

EmailChangeModel.init(
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
    otp: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    otp_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    old_email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    new_email: {
      type: DataTypes.STRING,
      allowNull: true
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
    modelName: MODELS.t_email_change,
    tableName: TABLES.t_email_change,
    timestamps: true,
    createdAt:'created_on',
    updatedAt:false
  }
);

