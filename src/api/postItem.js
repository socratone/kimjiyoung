const url = process.env.REACT_APP_API_URL;

const postItem = async ({ title, description, price, category, storeLink, imageFileName }) => {
  const headers = new Headers();
  const token = localStorage.getItem('token')
  headers.append('x-auth-token', token);
  headers.append('Content-Type', 'application/json');

  try {
    const raw = JSON.stringify({ 
      title, 
      description, 
      price, 
      category, 
      storeLink, 
      imageFileName
    });

    const res = await fetch(url + '/api/item', {
      method: 'POST',
      headers,
      body: raw,
      redirect: 'follow'
    });

    const result = await res.json();
    if (res.status === 200) {
      return result;
    } else if (res.status === 500) {
      return { error: result.error };
    }
  } catch (error) {
    return { error };
  }
};

export default postItem;