import User from '../models/user.model';

export const migration = () => {
  User.sync({ force: false });
};
