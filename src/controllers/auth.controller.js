const {
  hashPassword,
  comparePassword,
  generateToken,
  generateRefreshToken,
} = require("../helpers/auth");

const db = require("../models");

const { User, Role } = db;

const register = (req, res, next) => {
  const payload = {
    email: req.body?.email,
    password: hashPassword(req.body?.password),
  };

  new User(payload).save((errorr, user) => {
    if (errorr) {
      next(Error("Inernal server error"));
      return;
    }

    Role.findOne({ name: "client" }, (error, role) => {
      if (error) {
        next(Error("Inernal server error"));
        return;
      }

      user.roles = [role?._id];
      user.save((err) => {
        if (err) {
          next(Error("Upload file error"));
          return;
        }

        return res.json({ message: "User was registered successfully!" });
      });
    });
  });
};

const login = (req, res, next) => {
  const payload = {
    email: req.body?.email,
    password: req.body?.password,
  };

  User.findOne({
    email: payload.email,
  })
    .populate("roles")
    .exec((err, user) => {
      if (err) {
        next(Error("Inernal server error"));
        return;
      }

      if (!user) {
        res.status(404).json({ message: "User Not found." });
      }

      const passwordIsValid = comparePassword(payload.password, user.password);

      if (!passwordIsValid) {
        res.status(401).json({
          message: "Invalid Password!",
        });
      }
      const accessToken = generateToken(user?._id);
      const accessTokenExpiresIn = process.env.ACCESS_TOKEN_EXPIRES;
      const refreshToken = generateRefreshToken(user?._id);
      const refreshTokenExpiresIn = process.env.REFRESH_TOKEN_EXPIRES;

      const authorities = [];

      for (let i = 0; i < user.roles.length; i += 1) {
        authorities.push(`ROLE_${user.roles[i].name.toUpperCase()}`);
      }

      res.status(200).send({
        email: user.email,
        roles: authorities,
        accessToken,
        accessTokenExpiresIn,
        refreshToken,
        refreshTokenExpiresIn,
      });
    });
};

const me = (req, res, next) => {
  User.findById(req?.userId)
    .select("-_id email")
    .exec((err, user) => {
      if (err) {
        next(Error("Inernal server error"));
        return;
      }

      if (!user) {
        return res.status(404).json({ message: "User Not found." });
      }

      return res.status(200).send(user);
    });
};

const refreshToken = (req, res) => {
  User.findById(req?.userId).exec((err, user) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    if (!user) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    const accessToken = generateToken(user?._id);
    const accessTokenExpiresIn = process.env.ACCESS_TOKEN_EXPIRES;

    res.json({
      accessToken,
      accessTokenExpiresIn,
    });
  });
};

module.exports = {
  register,
  login,
  me,
  refreshToken,
};
