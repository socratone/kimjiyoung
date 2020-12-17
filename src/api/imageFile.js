import AWS from 'aws-sdk';

const putImageFile = async (file, category) => {  
  const albumBucketName = process.env.REACT_APP_S3_BUCKET_NAME;
  const region = 'ap-northeast-2';
  const accessKeyId = process.env.REACT_APP_S3_KEY_ID;
  const secretAccessKey = process.env.REACT_APP_S3_SECRET_KEY;

  AWS.config.update({
    region,
    accessKeyId,
    secretAccessKey
  }); 
  
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: albumBucketName,
      Key: `sacred-things/${category}/${file.name}`,
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

export { putImageFile };
