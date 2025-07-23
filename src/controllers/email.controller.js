const emailing = require("../services/emailing");

const send = (req, res, next) => {
  emailing
    .send("assidi.wassim.dev@gmail.com", "test", "test technique")
    .then((data) => {
      res.status(200).json({ message: "Email send successfully", data });
    })
    .catch((error) => next(error));
};

module.exports = {
  send,
};
