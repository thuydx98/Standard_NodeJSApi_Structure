import Sequelize from 'sequelize';
import database from '../configs/database';

const userSchema = {
  fullName: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(200),
  },
  phone: {
    type: Sequelize.STRING(10),
  },
  address: {
    type: Sequelize.STRING(500),
  },
  username: {
    type: Sequelize.STRING(200),
  },
  password: {
    type: Sequelize.STRING(200),
  },
};

export default database.define('users', userSchema);
