import jwtDecode from 'jwt-decode'

const getUserByToken = () => {
  try {
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    console.log('user:', user)
    return JSON.parse(user.data);
  } catch (error) {
    return { account: null };
  }
};

export default getUserByToken;