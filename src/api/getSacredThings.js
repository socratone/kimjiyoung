const url = process.env.REACT_APP_API_URL;

const getSacredThings = async () => {
  try {
    const res = await fetch(url + '/api/items');
    return await res.json();
  } catch (error) {

  }
}; 

export default getSacredThings;
