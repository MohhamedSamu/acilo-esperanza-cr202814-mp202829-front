export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Debes ingresar un correo.';
  if (!re.test(email)) return 'Ooops! Debe ser un correo válido.';

  return '';
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return 'Debes ingresar una contraseña.';

  return '';
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) return 'Debes ingresar un valor.';

  return '';
};
