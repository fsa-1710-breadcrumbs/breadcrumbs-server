const AWS = require('aws-sdk');
const Chance = require('chance');
const s3 = new AWS.S3();
const chance = new Chance();

const s3upload = {};
let myBucket = 'crumbs-deployments-mobilehub-546753528';

s3upload.uploadToS3 = (req, res, next) => {
  const fileName = chance.string({length: 16});
  let base64ImageString = req.body.photoUrl;

  let buff = new Buffer(base64ImageString.replace(/^data:image\/\w+;base64,/, ""), 'base64');

  const s3Params = {
    Bucket: myBucket,
    Key: fileName,
    ContentType: 'image/png',
    Body: buff,
    ContentEncoding: 'base64',
    ACL: 'public-read'
  };

    s3.putObject(s3Params, function(error, data){
      if (error){
          err(error);
      } else {
        req.body.photoUrl = `https://s3.amazonaws.com/${myBucket}/${fileName}`;
        next();
      }
    })
  };

module.exports = s3upload;