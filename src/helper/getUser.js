import jwtDecode from 'jwt-decode'

const getUser = () => {
  try {
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt);
    return user;
  } catch (error) {
    return { account: null };
  }
};

export default getUser;