import AWS from 'aws-sdk';

const albumBucketName = process.env.REACT_APP_S3_BUCKET_NAME;
const region = 'ap-northeast-2';
const accessKeyId = process.env.REACT_APP_S3_KEY_ID;
const secretAccessKey = process.env.REACT_APP_S3_SECRET_KEY;

const putImageFile = async (file, category, name) => {  
  AWS.config.update({
    region,
    accessKeyId,
    secretAccessKey
  }); 
  
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: albumBucketName,
      Key: `sacred-things/${category}/${name}`,
      Body: file,
      ACL: "public-read"
    }
  });
  
  const promise = upload.promise();

  return promise.then((data) => {
      console.log("Successfully uploaded photo.");
      return { data };
    },
    (err) => {
      return { error: { message: err.message }};
    }
  );
};

const listImageFiles = path => {
  return new Promise((resolve, reject) => {
    AWS.config.update({
      region,
      accessKeyId,
      secretAccessKey
    });
  
    const s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: albumBucketName }
    });
  
    s3.listObjects({ Delimiter: path }, function(err, data) {
      if (err) {
        console.log('There was an error listing your albums: ' + err.message);
        reject({ error: { message: err.message }});
      }
      resolve(data.Contents);
    });
  });
};

const deleteImageFile = key => {
  return new Promise((resolve, reject) => {
    AWS.config.update({
      region,
      accessKeyId,
      secretAccessKey
    }); 

    const s3 = new AWS.S3({
      apiVersion: "2006-03-01",
      params: { Bucket: albumBucketName }
    });

    s3.deleteObject({ Key: key }, function(err, data) {
      if (err) {
        console.log("There was an error deleting your file: ", err.message);
        reject({ error: { message: err.message }});
      }
      console.log("Successfully deleted file.");
      resolve({ data });
    });
  });
};

export { putImageFile, listImageFiles, deleteImageFile };
