const url = process.env.REACT_APP_API_URL;

const headers = new Headers();
headers.append("Content-Type", "application/json");

const postSignup = async (email, password, name) => {
  try {
    const raw = JSON.stringify({ email, password, name });
    const res = await fetch(url + '/api/signup', {
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

export default postSignup;