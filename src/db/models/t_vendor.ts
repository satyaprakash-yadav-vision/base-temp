import { Model, DataTypes } from 'sequelize';
import { MODELS, TABLES } from '../../constants';
import { DB_CONN } from '../dbConnection';

export default class VendorModel extends Model {
  public user_id: number;
  public first_name: string;
  public last_name: string;
  public username: string;
  public password: string;
  public email_id: string;
  public gender: string;
  public phone_no: string;
  public valid: boolean;
  public otp: string;
  public otp_expires: string;
  public status: string;
  public created_on: Date;
  public updated_on: Date;
}

VendorModel.init(

  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone_no: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM('M', 'F','O'),
      allowNull: true
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    otp_expires: {
      type: DataTypes.DATE,
      allowNull: true
    },
    password:{
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('A', 'I'),
      allowNull: false,
      defaultValue: 'I'
    },
    valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize: DB_CONN,
    modelName: MODELS.t_user,
    tableName: TABLES.t_user,
    timestamps: true,
    createdAt: 'created_on',
    updatedAt: 'updated_on'
  }
);
