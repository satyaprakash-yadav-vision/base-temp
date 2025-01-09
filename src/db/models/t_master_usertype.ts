import { Model, DataTypes } from 'sequelize';
import { MODELS, TABLES } from '../../constants';
import { DB_CONN } from '../dbConnection';

export default class UserTypeMasterModel extends Model {
  public user_type_id: number;
  public user_type: string;
  public status: string;
}

UserTypeMasterModel.init(
  {
    user_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('A', 'I'),
      allowNull: false,
      defaultValue: 'A',
      comment: 'A:Active, I:Inactive'
    }
  },
  {
    sequelize: DB_CONN,
    modelName: MODELS.t_master_user_type,
    tableName: TABLES.t_master_user_type,
    timestamps: false
  }
);
