import jwt from 'jsonwebtoken';
import userService from '../services/user.service';
import userHandler from '../handlers/user.handler';
import response from '../utils/response';
import StatusCode from '../constants/http-status-code';

export default {
  async signup(req, res) {
    try {
      const { error } = userHandler.validateSignup(req.body);
      if (error) {
        return response.error(res, error, StatusCode.BadRequest);
      }

      var hashedPassword = await userHandler.hashPassword(req.body.password);
      const result = await userService.createNewUser(
        req.body.fullName,
        req.body.email,
        req.body.phone,
        req.body.address,
        req.body.username,
        hashedPassword,
      );

      return response.success(res, result);
    } catch (error) {
      response.error(res, error, StatusCode.InternalServerError);
    }
  },
  async login(req, res) {
    try {
      var isUsernameExist = await userService.getUsername(req.body.username);
      if (isUsernameExist != null) {
        if (
          userHandler.comparePassword(
            req.body.password,
            isUsernameExist.password,
          )
        ) {
          return response.success(res, {
            token: jwt.sign(
              {
                username: isUsernameExist.username,
                email: isUsernameExist.email,
                fullName: isUsernameExist.fullName,
                id: isUsernameExist.id,
              },
              'Token',
            ),
          });
        } else {
          return response.error(
            res,
            'password is incorrect',
            StatusCode.NotFound,
          );
        }
      } else {
        return response.error(
          res,
          'The account is not exist',
          StatusCode.NotFound,
        );
      }
    } catch (error) {
      return response.error(res, error, StatusCode.InternalServerError);
    }
  },
  async logedin(req, res) {
    jwt.verify(req.token, 'Token', (err, authData) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        return response.success(res, authData);
      }
    });
  },
  async verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader != 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;

      next();
    } else {
      res.sendStatus(403);
    }
  },
};
