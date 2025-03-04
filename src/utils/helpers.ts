export const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const getFirstLetter = (str: string) => {
  return str[0].toUpperCase();
};
