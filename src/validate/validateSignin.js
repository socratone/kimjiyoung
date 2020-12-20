const validateSignin = ({ email, password }) => {
  if (email.length < 1) throw new Error('이메일을 입력해주세요.');
  if (password.length < 1) throw new Error('비밀번호를 입력해주세요.');
};

export default validateSignin;