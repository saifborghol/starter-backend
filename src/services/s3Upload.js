const AWS = require("aws-sdk");
const pathLib = require("path");
const s3Config = require("../config/aws");

const s3 = new AWS.S3({
  accessKeyId: s3Config.AWS_ACCESS_KEY,
  secretAccessKey: s3Config.AWS_SECRET_ACCESS_KEY,
  region: s3Config.AWS_REGION,
});

const upload = (path, file) => {
  const params = {
    Bucket: s3Config.AWS_BUCKET,
    Key: `${path}/${Date.now()}-${file.name}`,
    Body: file.data,
    ACL: "public-read",
    ContentType: file.mimetype,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(Error("Upload file error"));
      }
      if (data) {
        resolve(data.Location);
      }
    });
  });
};

const list = (path) => {
  const params = {
    Bucket: s3Config.AWS_BUCKET,
    Delimiter: "/",
    Prefix: path?.includes(["/", ""]) ? "" : path,
  };

  return new Promise((resolve, reject) => {
    s3.listObjects(params, (err, data) => {
      if (err) {
        reject(Error("Retrieve data error"));
      } else {
        const listTemp = [];
        const s3Objects = data?.Contents;
        const s3Prefixes = data?.CommonPrefixes;

        if (s3Objects) {
          listTemp.push(
            ...s3Objects.map((object) => ({
              id: object?.Key,
              name: pathLib.basename(object.Key),
              url: `https://${s3Config.AWS_BUCKET}.s3.amazonaws.com/${object?.Key}`,
              modDate: object?.LastModified,
              size: object?.Size,
              isDir: false,
            }))
          );
        }

        if (s3Prefixes) {
          listTemp.push(
            ...s3Prefixes.map((prefix) => ({
              id: prefix?.Prefix,
              name: pathLib.basename(prefix.Prefix),
              isDir: true,
            }))
          );
        }

        resolve(listTemp);
      }
    });
  });
};

module.exports = {
  upload,
  list,
};
