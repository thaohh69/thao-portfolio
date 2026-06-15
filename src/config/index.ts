/**
 * Centralized configuration for the AI Portfolio application
 * Contains API endpoints, animation settings, and UI constants
 */

// API Configuration
export const API_CONFIG = {
  endpoints: {
    chat: '/api/chat',
    githubStars: '/api/github-stars',
    visits: '/api/visits',
  },
  timeouts: {
    default: 30000, // 30 seconds
    upload: 60000,  // 60 seconds
  },
} as const;

// Animation Configuration
export const ANIMATION_CONFIG = {
  durations: {
    short: 0.2,
    medium: 0.3,
    long: 0.8,
    chevron: 1.5,
  },
  delays: {
    stagger: 0.1,
    hero: 0.2,
  },
  easing: {
    default: 'easeInOut',
    spring: 'easeOut',
  },
  spring: {
    stiffness: 400,
    damping: 25,
  },
} as const;

// UI Configuration
export const UI_CONFIG = {
  colors: {
    primary: '#0171E3',
    primaryHover: '#1d4ed8',
    secondary: '#6B7280',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    // Question category colors
    about: '#329696',
    experience: '#4F46E5',
    projects: '#3E9858',
    skills: '#856ED9',
    contact: '#C19433',
    menu: '#6B7280',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
} as const;

// Application Configuration
export const APP_CONFIG = {
  name: 'Thao Ho - AI Portfolio',
  description: 'Data Engineering & AI Portfolio',
  author: {
    name: 'Thao Ho',
    nickname: 'Thao Ho',
    email: 'thaohohoang.work@gmail.com',
    github: 'https://github.com/thaohh69',
    //medium: 'https://medium.com/@kc.chigili',
    portfolio: 'https://github.com/thaohh69',
  },
  features: {
    visitCounter: true,
    fluidCursor: true,
    chatAssistant: true,
    animations: true,
  },
  assets: {
    avatar: {
      main: '/thao_avatar.jpg',
      deep: '/avatar_deep_stare.jpg',
      expressions: '/avatar_expressions.mov',
      video: '/avatar_hi_video.mov',
      fistBump: '/fist_bump_avatar.jpg',
    },
    profile: '/profile-thao.jpg',
    memojis: {
      static: '/thao_avatar.jpg',
      webm: '/avatar_hi_video.mov',
      mp4: '/avatar_hi_video.mov',
    },
  },
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  enableAnalytics: process.env.NODE_ENV === 'production',
  enableErrorReporting: process.env.NODE_ENV === 'production',
  enableDebugMode: process.env.NODE_ENV === 'development',
  enableExperimentalFeatures: false,
} as const;

// Export all configurations
export const CONFIG = {
  api: API_CONFIG,
  animation: ANIMATION_CONFIG,
  ui: UI_CONFIG,
  app: APP_CONFIG,
  features: FEATURE_FLAGS,
} as const;

export default CONFIG;