/**
 * UI-specific type definitions for components, styling, and interactions
 */

import { ReactNode, CSSProperties } from 'react';
import { LucideIcon } from 'lucide-react';

// Base UI Component Props
export interface BaseUIProps {
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  id?: string;
}

// Button Types
export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export interface ButtonProps extends BaseUIProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: LucideIcon;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  asChild?: boolean;
}

// Modal and Dialog Types
export interface DialogProps extends BaseUIProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  showCloseButton?: boolean;
}

export interface DrawerProps extends BaseUIProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

// Tooltip Types
export interface TooltipProps extends BaseUIProps {
  content: ReactNode;
  delay?: number;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

// Input and Form Types
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

export interface InputProps extends BaseUIProps {
  type?: InputType;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export interface TextareaProps extends Omit<InputProps, 'type' | 'prefix' | 'suffix'> {
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  autoResize?: boolean;
}

// Card Types
export interface CardProps extends BaseUIProps {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  clickable?: boolean;
  onClick?: () => void;
}

// Avatar Types
export interface AvatarProps extends BaseUIProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  shape?: 'circle' | 'square';
}

// Badge Types
export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

export interface BadgeProps extends BaseUIProps {
  variant?: BadgeVariant;
  size?: 'sm' | 'md' | 'lg';
}

// Animation Types
export interface MotionProps {
  initial?: import('framer-motion').Variants['initial'] | boolean;
  animate?: import('framer-motion').Variants['animate'];
  exit?: import('framer-motion').Variants['exit'];
  transition?: import('framer-motion').Transition;
  variants?: import('framer-motion').Variants;
  whileHover?: import('framer-motion').VariantLabels;
  whileTap?: import('framer-motion').VariantLabels;
  whileInView?: import('framer-motion').VariantLabels;
  viewport?: import('framer-motion').ViewportOptions;
}

export interface AnimatedElementProps extends BaseUIProps, MotionProps {
  delay?: number;
  duration?: number;
  stagger?: number;
}

// Layout Types
export interface ContainerProps extends BaseUIProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
  center?: boolean;
}

export interface GridProps extends BaseUIProps {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export interface FlexProps extends BaseUIProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

// Navigation Types
export interface NavProps extends BaseUIProps {
  variant?: 'horizontal' | 'vertical';
  items: NavItem[];
  activeItem?: string;
  onItemClick?: (href: string) => void;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  badge?: string | number;
  disabled?: boolean;
  external?: boolean;
}

// Loading and Skeleton Types
export interface LoadingProps extends BaseUIProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
  text?: string;
}

export interface SkeletonProps extends BaseUIProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | false;
}

// Message and Alert Types
export type MessageType = 'info' | 'success' | 'warning' | 'error';

export interface MessageProps extends BaseUIProps {
  type?: MessageType;
  title?: string;
  description?: string;
  closable?: boolean;
  onClose?: () => void;
  actions?: ReactNode;
}

export interface AlertProps extends MessageProps {
  variant?: 'default' | 'destructive';
  icon?: LucideIcon | boolean;
}

// Table Types
export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: unknown, record: T, index: number) => ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  fixed?: 'left' | 'right';
}

export interface TableProps<T = Record<string, unknown>> extends BaseUIProps {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  pagination?: boolean;
  pageSize?: number;
  selectable?: boolean;
  onRowClick?: (record: T, index: number) => void;
  onSelectionChange?: (selectedRows: T[]) => void;
}

// Chat UI Types
export interface ChatBubbleProps extends BaseUIProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
  avatar?: string;
  actions?: ReactNode;
}

export interface ChatInputProps extends BaseUIProps {
  placeholder?: string;
  onSend: (message: string) => void;
  disabled?: boolean;
  loading?: boolean;
  maxLength?: number;
  attachments?: boolean;
}

// Portfolio-specific UI Types
export interface ProjectCardProps extends BaseUIProps {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  category: string;
  status: 'completed' | 'in-progress' | 'planned';
  onClick?: () => void;
  featured?: boolean;
}

export interface SkillBadgeProps extends BaseUIProps {
  skill: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  years?: number;
  variant?: 'default' | 'compact';
}

export interface ExperienceTimelineProps extends BaseUIProps {
  experiences: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
    achievements: string[];
  }>;
}

// Responsive Types
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ResponsiveValue<T> {
  base?: T;
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}

// Color Types
export type ColorScheme = 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink';

export interface ColorProps {
  color?: ColorScheme;
  variant?: 'solid' | 'subtle' | 'outline';
}

// Spacing Types
export type SpacingValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64;

export interface SpacingProps {
  m?: SpacingValue | ResponsiveValue<SpacingValue>;
  mt?: SpacingValue | ResponsiveValue<SpacingValue>;
  mr?: SpacingValue | ResponsiveValue<SpacingValue>;
  mb?: SpacingValue | ResponsiveValue<SpacingValue>;
  ml?: SpacingValue | ResponsiveValue<SpacingValue>;
  mx?: SpacingValue | ResponsiveValue<SpacingValue>;
  my?: SpacingValue | ResponsiveValue<SpacingValue>;
  p?: SpacingValue | ResponsiveValue<SpacingValue>;
  pt?: SpacingValue | ResponsiveValue<SpacingValue>;
  pr?: SpacingValue | ResponsiveValue<SpacingValue>;
  pb?: SpacingValue | ResponsiveValue<SpacingValue>;
  pl?: SpacingValue | ResponsiveValue<SpacingValue>;
  px?: SpacingValue | ResponsiveValue<SpacingValue>;
  py?: SpacingValue | ResponsiveValue<SpacingValue>;
}

// Event Types
export interface ClickHandler {
  (event: React.MouseEvent<HTMLElement>): void;
}

export interface KeyboardHandler {
  (event: React.KeyboardEvent<HTMLElement>): void;
}

export interface FocusHandler {
  (event: React.FocusEvent<HTMLElement>): void;
}

// Style utility types
export type StyleVariant = string | undefined;
export type StyleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type StyleColor = string;

// Component state types
export interface ComponentState {
  loading: boolean;
  error: string | null;
  data: unknown;
}

export interface AsyncComponentState<T> extends ComponentState {
  data: T | null;
}

// Form validation types
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => string | undefined;
}

export interface FieldValidation {
  [fieldName: string]: ValidationRule[];
}

// Export utility types
export type UIComponent<P = {}> = React.FC<P & BaseUIProps>;
export type UIComponentWithRef<P = {}, R = HTMLElement> = React.ForwardRefExoticComponent<P & BaseUIProps & React.RefAttributes<R>>;