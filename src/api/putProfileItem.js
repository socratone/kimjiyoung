const url = process.env.REACT_APP_API_URL;

const putProfileItem = async ({ image, text }) => {
  const headers = new Headers();
  const token = localStorage.getItem('token')
  headers.append('x-auth-token', token);
  headers.append('Content-Type', 'application/json');
  
  try {
    const raw = JSON.stringify({ 
      image,
      text
    });

    const res = await fetch(url + `/api/profile`, {
      method: 'PUT',
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

export default putProfileItem;