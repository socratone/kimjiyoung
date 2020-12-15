const url = process.env.REACT_APP_API_URL;


const postItem = async ({ title, description, price, category, storeLink, imageFile }) => {
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
      imageFileName: imageFile.name 
    });

    const res = await fetch(url + '/api/item', {
      method: 'POST',
      headers,
      body: raw,
      redirect: 'follow'
    });

    const { status, ok } = res;
    const { message } = await res.json();
    return { status, ok, message: message.toString() };
  } catch (error) {
    return { status: null, ok: false, message: error.toString() };
  }
};

export default postItem;