const url = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const postProfileItem = async ({ description, imageFileName }) => {
  const headers = new Headers();
  const token = localStorage.getItem('token')
  headers.append('x-auth-token', token);
  headers.append('Content-Type', 'application/json');

  try {
    const raw = JSON.stringify({ 
      description, 
      imageFileName
    });

    const res = await fetch(url + '/api/profile/item', {
      method: 'POST',
      headers,
      body: raw,
      redirect: 'follow'
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { error };
  }
};

export default postProfileItem;