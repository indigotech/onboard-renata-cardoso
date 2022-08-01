export const isEmpty = (value: string) => !value;

export const isEmailValid = (email: string) => {
  return email.match(`.*@.*\\.com.*`);
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

export const isCpfValid = (cpf: string) => {
  const hasLetter = /[a-zA-Z]/;
  return !hasLetter.test(cpf);
};

export const isBirthDateValid = (birthDate: string) => {
  const birthDateRegex =
    /^(?:19\d{2}|20[0-1][0-9])-(?:0[1-9]|1[012])-(?:0[1-9]|[12][0-9]|3[01])\b$/g;
  return birthDateRegex.test(birthDate);
};

export const isPhoneValid = (phone: string) => {
  const phoneRegex = /(\(?\d{2}\)?\s)?(\d{4,5}\d{4})/g;
  return phoneRegex.test(phone);
};
