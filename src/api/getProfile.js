const url = process.env.REACT_APP_API_URL;

const getProfile = async () => {
  try {
    const res = await fetch(url + '/api/profile');
    const result = await res.json();
    return result;
  } catch (error) {
    return { error };
  }
}; 

export default getProfile;
