const url = process.env.REACT_APP_API_URL;

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
    if (res.status === 200) {
      // TODO: 사진을 지운다.
      return result;
    } else if (res.status === 500) {
      return { error: result.error };
    }
  } catch (error) {
    return { error };
  }
};

export default deleteItem;