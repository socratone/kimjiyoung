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

    const { status, ok } = res;
    const { message } = await res.json();
    return { status, ok, message: message.toString() };
  } catch (error) {
    return { status: null, ok: false, message: error.toString() };
  }
};

export default postSignup;