import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getCsrfToken = () => {
  const cookies = document.cookie.split(';');
  const xsrfCookie = cookies.find(cookie => cookie.trim().startsWith('XSRF-TOKEN='));
  if (xsrfCookie) {
    return decodeURIComponent(xsrfCookie.split('=')[1]);
  }
  return null;
};