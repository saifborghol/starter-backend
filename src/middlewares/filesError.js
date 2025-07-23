const acceptedFiles = require("../config/files");

const fileValidation = (req, res, next) => {
  const reqFile = req?.files?.file;

  if (reqFile) {
    if (reqFile?.mimetype && reqFile?.name) {
      // Array of allowed files
      const allowedFileTypes = acceptedFiles?.mimetype;
      // Allowed file size in mb
      const allowedFileSize = acceptedFiles?.limit;
      // Check if the uploaded file is allowed
      if (!allowedFileTypes.includes(reqFile.mimetype)) {
        throw Error("Invalid file");
      }

      if (reqFile.size / (1024 * 1024) > allowedFileSize) {
        throw Error("File too large");
      }
    } else {
      throw Error("Upload file error");
    }
  }

  return next();
};

module.exports = {
  fileValidation,
};
