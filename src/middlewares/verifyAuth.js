const jwt = require("jsonwebtoken");
const db = require("../models");

const { ROLES_LIST, User, Role } = db;

const checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }

    next();
  });
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.role) {
    if (!ROLES_LIST.includes(req.body.role)) {
      res.status(400).json({
        message: `Failed! Role ${req.body.role} does not exist!`,
      });
      return;
    }
  }

  next();
};

const registerValidation = async (req, res, next) => {
  const payload = {
    email: req.body?.email,
    password: req.body?.password,
  };

  const userModel = new User(payload);

  await userModel
    .validate()
    .then(() => {
      next();
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (
    authHeader &&
    (authHeader.startsWith("bearer ") || authHeader.startsWith("Bearer "))
  ) {
    const token = authHeader.substring(7, authHeader.length);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  } else {
    return res.status(403).send({ message: "No token provided!" });
  }
};

const verifyRefreshToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (
    authHeader &&
    (authHeader.startsWith("bearer ") || authHeader.startsWith("Bearer "))
  ) {
    const token = authHeader.substring(7, authHeader.length);

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  } else {
    return res.status(403).send({ message: "No token provided!" });
  }
};

const isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((error, user) => {
    if (error) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          return res.status(401).send({ message: "Unauthorized!" });
        }

        const hasRole = roles?.find((role) => role?.name === "admin");

        if (!hasRole) {
          return res.status(401).send({ message: "Unauthorized!" });
        }

        next();
      }
    );
  });
};

const isClient = (req, res, next) => {
  User.findById(req.userId).exec((error, user) => {
    if (error) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          return res.status(401).send({ message: "Unauthorized!" });
        }

        const hasRole = roles?.find((role) => role?.name === "client");

        if (!hasRole) {
          return res.status(401).send({ message: "Unauthorized!" });
        }

        next();
      }
    );
  });
};

module.exports = {
  registerValidation,
  checkDuplicateEmail,
  checkRolesExisted,
  verifyToken,
  verifyRefreshToken,
  isAdmin,
  isClient,
};
