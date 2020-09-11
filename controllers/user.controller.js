import userService from "../services/user.service";
import userHandler from "../handlers/user.handler";
import jwt from "jsonwebtoken";
import isBoolean from "util";

export default {
  async signup(req, res) {
    try {
      const { value, error } = userService.validateSignup(req.body);
      if (error) {
        return res.send(error);
      }
      if (
        userService.validateConfirmPassword(
          req.body.password,
          req.body.confirmPassword
        ) == false
      ) {
        {
          return res.send("Xác nhận mật khẩu không chính xác");
        }
      }
      var hashedPassword = await userService.hashPassword(req.body.password);
      console.log(req.body);
      const result = await userHandler.createNewUser(
        req.body.fullName,
        req.body.email,
        req.body.phone,
        req.body.address,
        req.body.username,
        hashedPassword,
        req.body.age
      );
      return res.send({
        data: result,
        error: null,
        success: "Ok",
      });
    } catch (error) {
      return res.send({
        data: null,
        error: error,
        success: null,
      });
    }
  },
  async login(req, res) {
    try {
      var isUsernameExist = await userHandler.getUsername(req.body.username);
      if (isUsernameExist != null) {
        //console.log(isUsernameExist.password);
        if (
          userService.comparePassword(
            req.body.password,
            isUsernameExist.password
          )
        ) {
          return res.json({
            token: jwt.sign(
              {
                username: isUsernameExist.username,
                email: isUsernameExist.email,
                fullName: isUsernameExist.fullName,
                _id: isUsernameExist._id,
              },
              "Token"
            ),
          });
        } else {
          return res.send({
            error: "password is wrong",
          });
        }
      } else {
        res.send({
          error: "account is not exist",
        });
      }
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
  //secretkey
  async logedin(req, res) {
    jwt.verify(req.token, "Token", (err, authData) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        return res.json({
          message: "Workout",
          authData,
        });
      }
    });
  },
  async verifyToken(req, res, next) {
    const bearerHeader = req.headers["token"];
    console.log(bearerHeader);
    if (typeof bearerHeader != "undefined") {
      const bearer = bearerHeader.split(" ");

      const bearerToken = bearer[1];

      req.token = bearerToken;

      next();
    } else {
      res.send(403);
    }
  },
};
