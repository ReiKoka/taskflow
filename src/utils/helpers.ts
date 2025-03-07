import { tailwindColors, TYPES_OF_WORKSPACES } from "./constants";

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

export const getRandomTailwindColor = (): string => {
  return tailwindColors[Math.floor(Math.random() * tailwindColors.length)];
};

export function normalizeWorkspaceType(type: string): string {
  if (!type) return "";

  const normalizedType = type.toLowerCase().replace(/\s+/g, "-");

  return TYPES_OF_WORKSPACES.some((opt) => opt.value === normalizedType)
    ? normalizedType
    : "";
}
