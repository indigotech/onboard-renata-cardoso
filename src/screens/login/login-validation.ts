export const isEmpty = (value: string) => !value;

export const emailIsValid = (email: string) => {
  const emailIsValid = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;

  return emailIsValid.test(email);
};

export const passwordHasValidLength = (password: string) =>
  password.length >= 7;

export const passwordHasNumber = (password: string) => {
  const hasNumber = /[0-9]/;
  return hasNumber.test(password);
};

export const passwordHasLetter = (password: string) => {
  const hasLetter = /[a-zA-Z]/;
  return hasLetter.test(password);
};
