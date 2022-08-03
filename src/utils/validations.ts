import {cpf} from 'cpf-cnpj-validator';

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

export const isBirthDateValid = (birthDate: string) => {
  const birthDateRegex =
    /^(?:19\d{2}|20[0-1][0-9])-(?:0[1-9]|1[012])-(?:0[1-9]|[12][0-9]|3[01])\b$/g;
  return birthDateRegex.test(birthDate);
};

export const isPhoneValid = (phone: string) => {
  const phoneRegex = /(\(?\d{2}\)?\s)?(\d{4,5}\d{4})/g;
  return phoneRegex.test(phone);
};

export const emailValidation = (email: string) => {
  if (isEmpty(email)) {
    return 'Campos não devem estar vazios';
  } else if (!isEmailValid(email)) {
    return 'Email inválido';
  } else {
    return null;
  }
};

export const passwordValidation = (password: string) => {
  if (isEmpty(password)) {
    return 'Campos não devem estar vazios';
  } else if (!passwordHasValidLength(password)) {
    return 'Senha deve ter pelo menos 7 dígitos';
  } else if (!passwordHasNumber(password)) {
    return 'Senha deve conter pelo menos um número';
  } else if (!passwordHasLetter(password)) {
    return 'Senha deve possuir pelo menos uma letra';
  } else {
    return null;
  }
};

export const nameValidation = (name: string) => {
  if (isEmpty(name)) {
    return 'Campos não devem estar vazios';
  } else {
    return null;
  }
};

export const phoneValidation = (phone: string) => {
  if (isEmpty(phone)) {
    return 'Campos não devem estar vazios';
  } else if (!isPhoneValid(phone)) {
    return 'Telefone inválido';
  } else {
    return null;
  }
};

export const cpfValidation = (value: string) => {
  if (isEmpty(value)) {
    return 'Campos não devem estar vazios';
  } else if (!cpf.isValid(value)) {
    return 'CPF inválido';
  } else {
    return null;
  }
};

export const birthDateValidation = (birthDate: string) => {
  if (isEmpty(birthDate)) {
    return 'Campos não devem estar vazios';
  } else if (!isBirthDateValid(birthDate)) {
    return 'Data de Aniversário inválida';
  } else {
    return null;
  }
};
