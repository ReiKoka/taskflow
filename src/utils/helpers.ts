export const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const getFirstLetter = (str: string) => {
  return str[0].toUpperCase();
};

export const isPicture = (filename: string) => {
  if (!filename || typeof filename !== "string") return false;
  const validExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".svg",
    ".webp",
  ];
  return validExtensions.some((ext) => filename.toLowerCase().endsWith(ext));
};

const tailwindColors = [
  "bg-red-700",
  "bg-orange-700",
  "bg-amber-700",
  "bg-yellow-700",
  "bg-lime-700",
  "bg-green-700",
  "bg-emerald-700",
  "bg-teal-700",
  "bg-cyan-700",
  "bg-sky-700",
  "bg-blue-700",
  "bg-indigo-700",
  "bg-violet-700",
  "bg-purple-700",
  "bg-fuchsia-700",
  "bg-pink-700",
  "bg-rose-700",
];

export const getRandomTailwindColor = (): string => {
  return tailwindColors[Math.floor(Math.random() * tailwindColors.length)];
};
