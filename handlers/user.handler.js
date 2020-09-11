import User from '../models/user.model';
import mongoose from 'mongoose';
import Bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default {
    async createNewUser(
        fullName,
        email,
        phone,
        address,
        username,
        password,
        age
    ) {
        const newUser = await User.create({
            fullName,
            email,
            phone,
            address,
            username,
            password,
            age
        });
        return newUser;
    },
    async getUsername(username) {
        const user = await User.findOne({
            username
        });
        return user;
    }
}