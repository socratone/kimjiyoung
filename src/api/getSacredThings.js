const url = process.env.REACT_APP_API_URL;

const getSacredThings = async () => {
  try {
    const res = await fetch(url + '/api/items');
    const result = await res.json();
    return result;
  } catch (error) {
    return { error };
  }
}; 

export default getSacredThings;
