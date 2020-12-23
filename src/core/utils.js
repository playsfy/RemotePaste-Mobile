export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};

export const timeValidator = (name: string) => {
  const validate = /^\d{2}:\d{2}:\d{2}$/;

  if (!name || name.length <= 0) return 'Time cannot be empty.';
  if (!validate.test(name)) return 'Ooops! Time format must be 24Hr.';

  return '';
};
