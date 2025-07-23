const { hashPassword } = require("./auth");

const db = require("../models");

const { ROLES_LIST, Role, User } = db;


const initialDefaultAdminUser = () => {
  User.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {

      const payload = {
        email: process.env.DEFAULT_ADMIN_EMAIL,
        password: hashPassword(process.env.DEFAULT_ADMIN_PASSWORD),
      };

      new User(payload).save((error, user) => {
        if (error) {
          /* eslint-disable no-console */
          console.log("initialDefaultAdminUser error : ", error);
          return;
        }

        Role.findOne({ name: "admin" }, (error1, role) => {
          if (error1) {
            /* eslint-disable no-console */
            console.log("initialDefaultAdminUser error : ", error1);
            return;
          }

          user.roles = [role?._id];
          user.save((error2) => {
            if (error2) {
              /* eslint-disable no-console */
              console.log("initialDefaultAdminUser error : ", error2);
              return;
            }
            /* eslint-disable no-console */
            console.log("initialDefaultAdminUser done.");
          });
        });
      });
    }
  });
};

const initialRoles = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      Role.insertMany(ROLES_LIST)
        .then(() => {
          /* eslint-disable no-console */
          console.log("initialRoles done.");
          initialDefaultAdminUser()
        })
        .catch((error) => {
          /* eslint-disable no-console */
          console.log("initialRoles error : ", error);
        });
    }
  });
};

const initialDB= () => {
  initialRoles()
};

module.exports = {
  initialDB
};
