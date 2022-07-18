export const isEmpty = (email: string, password: string) => {
  if (!email || !password) {
    return true;
  }
};

export const emailIsValid = (email: string) => {
  const emailIsValid = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;

  if (emailIsValid.test(email) === false) {
    return false;
  }
  return true;
};

export const passwordHasLength = (password: string) => {
  if (password.length < 7) {
    return false;
  }
  return true;
};

export const passwordHasNumber = (password: string) => {
  const hasNumber = /[0-9]/;
  if (hasNumber.test(password) === false) {
    return false;
  }
  return true;
};

export const passwordHasLetter = (password: string) => {
  const hasLetter = /[a-zA-Z]/;
  if (hasLetter.test(password) === false) {
    return false;
  }
  return true;
};
