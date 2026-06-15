/**
 * Core type definitions for the AI Portfolio application
 */

import { LucideIcon } from 'lucide-react';

// Question and Category Types
export type QuestionKey = 'About' | 'Experience' | 'Projects' | 'Skills' | 'Contact';

export interface QuestionMap {
  readonly About: string;
  readonly Experience: string;
  readonly Projects: string;
  readonly Skills: string;
  readonly Contact: string;
}

export interface QuestionConfig {
  readonly key: QuestionKey | '';
  readonly color: string;
  readonly icon: LucideIcon;
  readonly isMenu?: boolean;
}

export interface QuestionCategory {
  readonly id: string;
  readonly name: string;
  readonly icon: LucideIcon;
  readonly questions: readonly string[];
}

// Component Props Types
export interface CategorySectionProps {
  name: string;
  Icon: React.ElementType;
  questions: string[];
  onQuestionClick: (question: string) => void;
}

export interface QuestionItemProps {
  question: string;
  onClick: () => void;
  isSpecial: boolean;
}

// Animation Types
export interface AnimationVariants {
  hidden: {
    opacity: number;
    y: number;
  };
  visible: {
    opacity: number;
    y: number;
    transition: {
      duration: number;
      delay?: number;
    };
  };
}

// Chat Types
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface HelperBoostProps {
  submitQuery?: (query: string) => void;
}

// API Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface GitHubStarsResponse {
  stars: number;
  lastUpdated: string;
}

export interface VisitCountResponse {
  count: number;
  isUnique: boolean;
}

// User Profile Types
export interface UserProfile {
  name: string;
  nickname: string;
  title: string;
  description: string;
  avatar: string;
  location: string;
  email: string;
  social: {
    github: string;
    medium: string;
    linkedin?: string;
  };
}

// Project Types
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: 'data-engineering' | 'machine-learning' | 'web-development' | 'mobile';
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  image?: string;
  links: {
    github?: string;
    demo?: string;
    documentation?: string;
  };
  metrics?: {
    performance?: string;
    users?: number;
    impact?: string;
  };
}

// Skill Types
export interface Skill {
  name: string;
  category: 'programming' | 'data' | 'cloud' | 'tools' | 'soft-skills';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  years: number;
  icon?: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
  description: string;
}

// Experience Types
export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: {
    start: string;
    end: string | 'present';
  };
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
}

// Education Types
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: {
    start: string;
    end: string;
  };
  gpa?: number;
  achievements?: string[];
  location: string;
}

// Common utility types
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: Date;
}

// Theme Types
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  theme: Theme;
  accentColor: string;
  fontFamily: string;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  external?: boolean;
}

// Form Types
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  role?: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// Export commonly used type unions
export type QuestionKeys = keyof QuestionMap;
export type ProjectStatus = Project['status'];
export type ProjectCategory = Project['category'];
export type SkillLevel = Skill['level'];
export type SkillCategoryType = Skill['category'];
export type ExperienceType = Experience['type'];