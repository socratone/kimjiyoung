const url = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const deleteItem = async id => {
  const headers = new Headers();
  const token = localStorage.getItem('token')
  headers.append('x-auth-token', token);
  headers.append('Content-Type', 'application/json');

  try {
    const res = await fetch(`${url}/api/item/${id}`, {
      method: 'DELETE',
      headers: headers,
      redirect: 'follow'
    });
  
    const result = await res.json();
    return result;
  } catch (error) {
    return { error };
  }
};

export default deleteItem;