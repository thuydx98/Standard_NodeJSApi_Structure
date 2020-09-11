import Joi from 'joi';
import Bcrypt from 'bcryptjs';

export default {
    hashPassword(password) {
        const salt = Bcrypt.genSaltSync(10);
        return Bcrypt.hashSync(password, salt);
    },
    comparePassword(password, hashedPassword) {
        return Bcrypt.compareSync(password, hashedPassword);
    },
    validateSignup(body) {
        const schema = Joi.object().keys({
            fullName: Joi.string().required(),
            email: Joi.string()
                .email()
                .required(),
            phone: Joi.string().min(8).max(11).required(),
            address: Joi.string().max(60).required(),
            username: Joi.string().max(15).required(),
            password: Joi.string().min(5).max(10).regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            confirmPassword: Joi.string().min(5).max(10).regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            age: Joi.number().integer()
        });
        const {
            error,
            value
        } = Joi.validate(body, schema);
        if (error && error.details) {
            return {
                error
            };
        }
        return {
            value
        };
    },
    validateLogin(body) {
        const schema = Joi.object().keys({
            username: Joi.string().required(),
            password: Joi.string().required(),
        });
        const {
            error,
            value
        } = Joi.validate(body, schema);
        if (error && error.details) {
            return {
                error
            };
        }
        return {
            value
        };
    },
    validateConfirmPassword(password, confirmPassword) {
        if (password != confirmPassword) {
            return false;
        }
        return true;
    }
};