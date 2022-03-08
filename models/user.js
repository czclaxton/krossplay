import { Sequelize, Model, DataTypes } from 'sequelize'

export class User extends Model {
  id
  username
  first_name
  last_name
  email

  static associations
}

export const userFactory = sequelize => {
  return User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      first_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      paranoid: false,
      tableName: 'user',
      underscored: true,
      defaultScope: {
        attributes: { exclude: ['deleted_at'] },
      },
    }
  )
}
