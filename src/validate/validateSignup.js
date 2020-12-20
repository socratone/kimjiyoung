const isValidEmail = email => {
  if (email.indexOf('@') === -1) return false;
  if (email.indexOf('.') === -1) return false;
  return true;
}

const validateSignup = ({ email, password, password2, name }) => {
  if (email.length < 1) {
    throw new Error('이메일을 입력해주세요.');
  } else if (!isValidEmail(email)) {
    throw new Error('올바른 이메일을 입력하세요.');
  } else if (password.length < 1 || password2.length < 1) {
    throw new Error('비밀번호를 입력해주세요.');
  } else if (password.length < 8) {
    throw new Error('비밀번호는 8자 이상이어야 합니다.');
  } else if (password !== password2) {
    throw new Error('비밀번호가 일치하지 않습니다.');
  } else if (name.length < 1) {
    throw new Error('이름을 입력해주세요.');
  }
};

export default validateSignup;