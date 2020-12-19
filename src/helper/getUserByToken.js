import jwtDecode from 'jwt-decode'

const getUserByToken = () => {
  try {
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    return JSON.parse(user.data);
  } catch (error) {
    return { account: null };
  }
};

export default getUserByToken;