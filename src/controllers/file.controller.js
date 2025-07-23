const s3Upload = require("../services/s3Upload");

const find = (req, res, next) => {
  const path = req?.query?.path;
  if (path) {
    s3Upload
      .list(path)
      .then((data) => {
        res.status(200).json({ message: "Data Retrieve successfully", data });
      })
      .catch((error) => next(error));
  } else {
    next(Error("Retrieve data error"));
  }
};

const upload = (req, res, next) => {
  const file = req?.files?.file;
  const path = req?.body?.path;

  if (file && path) {
    s3Upload
      .upload(path, file)
      .then((data) => {
        res.status(201).json({ message: "File uploaded successfully", data });
      })
      .catch((error) => next(error));
  } else {
    next(Error("Upload file error"));
  }
};

module.exports = {
  find,
  upload,
};
