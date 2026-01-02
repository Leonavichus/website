// src/types/ui.ts
/**
 * Типы для UI компонентов
 */

// Button
export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

// Card
export type CardVariant = 'elevated' | 'filled' | 'outlined';

export interface CardProps {
  variant?: CardVariant;
  clickable?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
}

// Input
export type InputVariant = 'filled' | 'outlined';
export type InputType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number';

export interface InputProps {
  variant?: InputVariant;
  type?: InputType;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  name?: string;
}

// Dialog
export interface DialogProps {
  open?: boolean;
  title?: string;
  fullscreen?: boolean;
  persistent?: boolean;
}

// Snackbar
export type SnackbarPosition = 'top' | 'bottom';
export type SnackbarType = 'info' | 'success' | 'warning' | 'error';

export interface SnackbarProps {
  message: string;
  type?: SnackbarType;
  position?: SnackbarPosition;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Progress
export type ProgressVariant = 'linear' | 'circular';

export interface ProgressProps {
  variant?: ProgressVariant;
  value?: number; // 0-100
  indeterminate?: boolean;
  size?: 'small' | 'medium' | 'large';
}

// Navigation
export type NavigationVariant = 'bar' | 'drawer' | 'rail';

export interface NavigationProps {
  variant?: NavigationVariant;
  items: Array<{
    label: string;
    href: string;
    icon?: string;
    badge?: number;
  }>;
  activeItem?: string;
}
