import { Model, DataTypes } from 'sequelize';
import { MODELS, TABLES } from '../../constants';
import { DB_CONN } from '../dbConnection';
import UserMasterModel from './t_user';
import UserTypeMasterModel from './t_master_usertype';

export default class UserTypeRoleModel extends Model {
  public usertype_role_id: number;
  public user_id: number;
  public user_type_id: number;
}

UserTypeRoleModel.init(
  {
    usertype_role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize: DB_CONN,
    modelName: MODELS.t_usertype_role,
    tableName: TABLES.t_usertype_role,
    timestamps: false
  }
);

UserTypeRoleModel.belongsTo(UserMasterModel, {
  foreignKey: 'user_id',
  as: 'userMasterMapping'
});

UserMasterModel.hasOne(UserTypeRoleModel, {
  foreignKey: 'user_id',
  as: 'userMasterTypeRoleMapping'
});

UserTypeRoleModel.belongsTo(UserTypeMasterModel, {
  foreignKey: 'user_type_id',
  as: 'userTypeMapping'
});
