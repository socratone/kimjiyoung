const isValidEmail = email => {
  if (email.indexOf('@') === -1) return false;
  if (email.indexOf('.') === -1) return false;
  return true;
}

export default isValidEmail;