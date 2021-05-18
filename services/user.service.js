import User from '../models/user.model';

export default {
  async createNewUser(fullName, email, phone, address, username, password) {
    return await User.create({
      fullName,
      email,
      phone,
      address,
      username,
      password,
    });
  },
  async getUsername(username) {
    return await User.findOne({ username });
  },
};
