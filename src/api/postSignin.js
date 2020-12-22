const url = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const headers = new Headers();
headers.append("Content-Type", "application/json");

const postSignin = async (email, password) => {
  try {
    const raw = JSON.stringify({ email, password });
    const res = await fetch(url + '/api/signin', {
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

export default postSignin;