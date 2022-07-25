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

export const cpfHasValidLength = (cpf: string) => cpf.length === 11;

export const birthDateIsValid = (birthDate: string) => {
  const birthDateIsValid =
    /^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$/;
  return birthDateIsValid.test(birthDate);
};
