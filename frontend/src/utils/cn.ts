import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function discountedPrice(price: number, discount = 0): number {
  if (!discount) return price;
  return Math.round(price * (1 - discount / 100));
}

export function destName(destination: { name: string } | string | undefined): string {
  if (!destination) return '';
  return typeof destination === 'string' ? destination : destination.name;
}
