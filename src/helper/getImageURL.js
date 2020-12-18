const s3URL = process.env.REACT_APP_S3_URL;

const getImageURL = (imageFile, category) => {
  if (imageFile.indexOf('http') >= 0) {
    return imageFile; // TODO: fakeImage 삭제 후 삭제
  }
  if (category) return `${s3URL}/sacred-things/${category}/${imageFile}`;
  return `${s3URL}/sacred-things/${imageFile}`;
}

export default getImageURL;