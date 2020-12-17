const url = process.env.REACT_APP_API_URL;

const getSacredThings = async () => {
  try {
    const res = await fetch(url + '/api/items');
    const result = await res.json();
    if (res.status === 200) {
      return result; 
    } else if (res.status === 500) {
      return { error: result.error };
    };
  } catch (error) {
    return { error };
  }
}; 

export default getSacredThings;
