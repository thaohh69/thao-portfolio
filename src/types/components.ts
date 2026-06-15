/**
 * Component-specific type definitions for the AI Portfolio application
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Variants } from 'framer-motion';

// Base Component Props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  'data-testid'?: string;
}

// Animation Props using Framer Motion types
export interface AnimationProps {
  initial?: Variants['initial'] | boolean;
  animate?: Variants['animate'];
  exit?: Variants['exit'];
  transition?: Variants['transition'];
  variants?: Variants;
  whileHover?: Variants['whileHover'];
  whileTap?: Variants['whileTap'];
  whileInView?: Variants['whileInView'];
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: number | 'some' | 'all';
  };
}

// Button Component Props
export interface ButtonProps extends BaseComponentProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  form?: string;
}

// Input Component Props
export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

// Textarea Component Props
export interface TextareaProps extends BaseComponentProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  rows?: number;
  cols?: number;
  maxLength?: number;
  minLength?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

// Modal Component Props
export interface ModalProps extends BaseComponentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
}

// Table Component Props
export interface TableColumn<TData = unknown> {
  key: string;
  title: string;
  dataIndex?: keyof TData;
  render?: (value: unknown, record: TData, index: number) => React.ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  filterable?: boolean;
}

export interface TableProps<TData = unknown> extends BaseComponentProps {
  columns: TableColumn<TData>[];
  data: TData[];
  loading?: boolean;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  rowKey?: keyof TData | ((record: TData) => string);
  onRow?: (record: TData) => Record<string, unknown>;
}

// Form Component Props
export interface FormFieldProps extends BaseComponentProps {
  label?: string;
  error?: string;
  required?: boolean;
  helpText?: string;
  labelPosition?: 'top' | 'left' | 'inline';
}

export interface FormProps extends BaseComponentProps {
  onSubmit: (data: Record<string, unknown>) => void | Promise<void>;
  initialValues?: Record<string, unknown>;
  validationSchema?: Record<string, ValidationRule[]>;
  disabled?: boolean;
  loading?: boolean;
}

// Chat Component Props
export interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    role: 'user' | 'assistant' | 'system';
    timestamp: Date;
    parts?: Array<{
      type: string;
      text?: string;
      toolInvocation?: {
        toolCallId: string;
        toolName: string;
        args: Record<string, unknown>;
        state: string;
      };
    }>;
  };
  isLast: boolean;
  isLoading: boolean;
  reload: () => Promise<unknown>;
}

export interface ChatBottombarProps {
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  stop: () => void;
  isToolInProgress: boolean;
}

// Tooltip Component Props
export interface TooltipProps extends BaseComponentProps {
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  delayDuration?: number;
  skipDelayDuration?: number;
  disableHoverableContent?: boolean;
}

// Card Component Props
export interface CardProps extends BaseComponentProps {
  title?: string;
  description?: string;
  image?: string;
  category?: string;
  content?: React.ReactNode;
  actions?: React.ReactNode;
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

// Navigation Component Props
export interface NavItemProps {
  href: string;
  label: string;
  icon?: LucideIcon;
  active?: boolean;
  external?: boolean;
  onClick?: () => void;
}

export interface NavigationProps extends BaseComponentProps {
  items: NavItemProps[];
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'pills' | 'underline';
}

// Loading Component Props
export interface LoadingProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
  text?: string;
  fullScreen?: boolean;
}

// Badge Component Props
export interface BadgeProps extends BaseComponentProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

// Avatar Component Props
export interface AvatarProps extends BaseComponentProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  onClick?: () => void;
}

// Validation Rule Type
export interface ValidationRule<T = unknown> {
  validate: (value: T) => boolean | string;
  message?: string;
}

// Common Event Handlers
export type MouseEventHandler<T = HTMLElement> = (event: React.MouseEvent<T>) => void;
export type ChangeEventHandler<T = HTMLElement> = (event: React.ChangeEvent<T>) => void;
export type FocusEventHandler<T = HTMLElement> = (event: React.FocusEvent<T>) => void;
export type KeyboardEventHandler<T = HTMLElement> = (event: React.KeyboardEvent<T>) => void;
export type FormEventHandler<T = HTMLElement> = (event: React.FormEvent<T>) => void;

// Utility Types for Components
export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';
export type ComponentVariant = 'default' | 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost';
export type ComponentAlignment = 'left' | 'center' | 'right';
export type ComponentOrientation = 'horizontal' | 'vertical';

// Generic Props with forwarded ref
export type ForwardedRefComponent<P, T> = React.ForwardRefExoticComponent<
  P & React.RefAttributes<T>
>;