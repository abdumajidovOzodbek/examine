import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

class User extends Model {
	public userId!: number
	public username!: string
	public age!: number
}


User.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(32),
    allowNull: false,
    validate: {
      isLowercase: true,
      len: [2, 32],
    },
  },
  age: DataTypes.SMALLINT,
}, {
	tableName: 'users',
	sequelize,
  paranoid: true
});


export default User;