/**
 * Utility Functions
 * 
 * String manipulation helpers, date formatting utilities, number formatting,
 * URL and slug utilities, and other common utility functions.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using clsx and tailwind-merge
 * 
 * @param inputs - Class values to combine
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * String manipulation utilities
 */
export const string = {
  /**
   * Capitalizes the first letter of a string
   * 
   * @param str - String to capitalize
   * @returns Capitalized string
   */
  capitalize: (str: string): string => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  /**
   * Capitalizes the first letter of each word
   * 
   * @param str - String to convert to title case
   * @returns Title case string
   */
  titleCase: (str: string): string => {
    if (!str) return str;
    return str.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  },

  /**
   * Converts string to camelCase
   * 
   * @param str - String to convert
   * @returns camelCase string
   */
  camelCase: (str: string): string => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, '');
  },

  /**
   * Converts string to kebab-case
   * 
   * @param str - String to convert
   * @returns kebab-case string
   */
  kebabCase: (str: string): string => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  },

  /**
   * Converts string to snake_case
   * 
   * @param str - String to convert
   * @returns snake_case string
   */
  snakeCase: (str: string): string => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/[\s-]+/g, '_')
      .toLowerCase();
  },

  /**
   * Truncates a string to a specified length
   * 
   * @param str - String to truncate
   * @param length - Maximum length
   * @param suffix - Suffix to add (default: '...')
   * @returns Truncated string
   */
  truncate: (str: string, length: number, suffix: string = '...'): string => {
    if (!str || str.length <= length) return str;
    return str.slice(0, length - suffix.length) + suffix;
  },

  /**
   * Removes HTML tags from a string
   * 
   * @param str - String with HTML tags
   * @returns Plain text string
   */
  stripHtml: (str: string): string => {
    return str.replace(/<[^>]*>/g, '');
  },

  /**
   * Extracts initials from a name
   * 
   * @param name - Full name
   * @param maxInitials - Maximum number of initials (default: 2)
   * @returns Initials string
   */
  getInitials: (name: string, maxInitials: number = 2): string => {
    if (!name) return '';
    
    return name
      .split(' ')
      .filter(part => part.length > 0)
      .slice(0, maxInitials)
      .map(part => part.charAt(0).toUpperCase())
      .join('');
  },

  /**
   * Generates a random string
   * 
   * @param length - Length of the string
   * @param charset - Character set to use
   * @returns Random string
   */
  random: (
    length: number = 10,
    charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  ): string => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
  },

  /**
   * Pluralizes a word based on count
   * 
   * @param word - Word to pluralize
   * @param count - Count to check
   * @param pluralForm - Custom plural form (optional)
   * @returns Pluralized word
   */
  pluralize: (word: string, count: number, pluralForm?: string): string => {
    if (count === 1) return word;
    
    if (pluralForm) return pluralForm;
    
    // Simple pluralization rules
    if (word.endsWith('y')) {
      return word.slice(0, -1) + 'ies';
    } else if (word.endsWith('s') || word.endsWith('x') || word.endsWith('z') || 
               word.endsWith('ch') || word.endsWith('sh')) {
      return word + 'es';
    } else {
      return word + 's';
    }
  },
};

/**
 * Number formatting utilities
 */
export const number = {
  /**
   * Formats a number as currency
   * 
   * @param value - Number to format
   * @param currency - Currency code (default: 'USD')
   * @param locale - Locale for formatting (default: 'en-US')
   * @returns Formatted currency string
   */
  currency: (
    value: number, 
    currency: string = 'USD', 
    locale: string = 'en-US'
  ): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(value);
  },

  /**
   * Formats a number with commas
   * 
   * @param value - Number to format
   * @param locale - Locale for formatting (default: 'en-US')
   * @returns Formatted number string
   */
  withCommas: (value: number, locale: string = 'en-US'): string => {
    return new Intl.NumberFormat(locale).format(value);
  },

  /**
   * Formats a number as percentage
   * 
   * @param value - Number to format (0.5 = 50%)
   * @param decimals - Number of decimal places (default: 0)
   * @param locale - Locale for formatting (default: 'en-US')
   * @returns Formatted percentage string
   */
  percentage: (
    value: number, 
    decimals: number = 0, 
    locale: string = 'en-US'
  ): string => {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  },

  /**
   * Formats a number in compact notation (1K, 1M, etc.)
   * 
   * @param value - Number to format
   * @param locale - Locale for formatting (default: 'en-US')
   * @returns Compact formatted string
   */
  compact: (value: number, locale: string = 'en-US'): string => {
    return new Intl.NumberFormat(locale, {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(value);
  },

  /**
   * Rounds a number to specified decimal places
   * 
   * @param value - Number to round
   * @param decimals - Number of decimal places (default: 2)
   * @returns Rounded number
   */
  round: (value: number, decimals: number = 2): number => {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  },

  /**
   * Clamps a number between min and max values
   * 
   * @param value - Number to clamp
   * @param min - Minimum value
   * @param max - Maximum value
   * @returns Clamped number
   */
  clamp: (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
  },
};

/**
 * Date formatting utilities
 */
export const date = {
  /**
   * Formats a date using Intl.DateTimeFormat
   * 
   * @param date - Date to format
   * @param options - Formatting options
   * @param locale - Locale for formatting (default: 'en-US')
   * @returns Formatted date string
   */
  format: (
    date: Date | string | number,
    options: Intl.DateTimeFormatOptions = {},
    locale: string = 'en-US'
  ): string => {
    const dateObj = new Date(date);
    return new Intl.DateTimeFormat(locale, options).format(dateObj);
  },

  /**
   * Formats a date in relative terms (e.g., "2 hours ago")
   * 
   * @param date - Date to format
   * @param locale - Locale for formatting (default: 'en-US')
   * @returns Relative time string
   */
  relative: (date: Date | string | number, locale: string = 'en-US'): string => {
    const dateObj = new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

    if (diffInSeconds < 60) {
      return rtf.format(-diffInSeconds, 'second');
    } else if (diffInSeconds < 3600) {
      return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
    } else if (diffInSeconds < 86400) {
      return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
    } else if (diffInSeconds < 2592000) {
      return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
    } else if (diffInSeconds < 31536000) {
      return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
    } else {
      return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
    }
  },

  /**
   * Checks if a date is today
   * 
   * @param date - Date to check
   * @returns True if date is today
   */
  isToday: (date: Date | string | number): boolean => {
    const dateObj = new Date(date);
    const today = new Date();
    
    return dateObj.getDate() === today.getDate() &&
           dateObj.getMonth() === today.getMonth() &&
           dateObj.getFullYear() === today.getFullYear();
  },

  /**
   * Checks if a date is in the past
   * 
   * @param date - Date to check
   * @returns True if date is in the past
   */
  isPast: (date: Date | string | number): boolean => {
    return new Date(date) < new Date();
  },

  /**
   * Adds days to a date
   * 
   * @param date - Base date
   * @param days - Number of days to add
   * @returns New date
   */
  addDays: (date: Date | string | number, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },

  /**
   * Gets the start of the day for a date
   * 
   * @param date - Date to process
   * @returns Date at start of day
   */
  startOfDay: (date: Date | string | number): Date => {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
  },

  /**
   * Gets the end of the day for a date
   * 
   * @param date - Date to process
   * @returns Date at end of day
   */
  endOfDay: (date: Date | string | number): Date => {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
  },
};

/**
 * URL and slug utilities
 */
export const url = {
  /**
   * Creates a URL-friendly slug from a string
   * 
   * @param str - String to convert to slug
   * @returns URL-friendly slug
   */
  slug: (str: string): string => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  /**
   * Extracts domain from URL
   * 
   * @param url - URL to extract domain from
   * @returns Domain string
   */
  getDomain: (url: string): string => {
    try {
      return new URL(url).hostname;
    } catch {
      return '';
    }
  },

  /**
   * Checks if a string is a valid URL
   * 
   * @param str - String to validate
   * @returns True if valid URL
   */
  isValid: (str: string): boolean => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Adds protocol to URL if missing
   * 
   * @param url - URL to process
   * @param protocol - Protocol to add (default: 'https')
   * @returns URL with protocol
   */
  addProtocol: (url: string, protocol: string = 'https'): string => {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `${protocol}://${url}`;
  },

  /**
   * Builds query string from object
   * 
   * @param params - Parameters object
   * @returns Query string
   */
  buildQuery: (params: Record<string, unknown>): string => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    
    return searchParams.toString();
  },

  /**
   * Parses query string to object
   * 
   * @param queryString - Query string to parse
   * @returns Parameters object
   */
  parseQuery: (queryString: string): Record<string, string> => {
    const params: Record<string, string> = {};
    const searchParams = new URLSearchParams(queryString);
    
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    
    return params;
  },
};

/**
 * Array utilities
 */
export const array = {
  /**
   * Removes duplicates from an array
   * 
   * @param arr - Array to deduplicate
   * @param key - Key function for complex objects
   * @returns Array without duplicates
   */
  unique: <T>(arr: T[], key?: (item: T) => string | number): T[] => {
    if (!key) {
      return [...new Set(arr)];
    }
    
    const seen = new Set();
    return arr.filter(item => {
      const keyValue = key(item);
      if (seen.has(keyValue)) {
        return false;
      }
      seen.add(keyValue);
      return true;
    });
  },

  /**
   * Chunks an array into smaller arrays
   * 
   * @param arr - Array to chunk
   * @param size - Size of each chunk
   * @returns Array of chunks
   */
  chunk: <T>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  },

  /**
   * Shuffles an array randomly
   * 
   * @param arr - Array to shuffle
   * @returns Shuffled array
   */
  shuffle: <T>(arr: T[]): T[] => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i]!;
      shuffled[i] = shuffled[j]!;
      shuffled[j] = temp;
    }
    return shuffled;
  },

  /**
   * Groups array elements by a key
   * 
   * @param arr - Array to group
   * @param key - Key function
   * @returns Grouped object
   */
  groupBy: <T, K extends string | number>(
    arr: T[], 
    key: (item: T) => K
  ): Record<K, T[]> => {
    return arr.reduce((groups, item) => {
      const groupKey = key(item);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    }, {} as Record<K, T[]>);
  },
};

/**
 * Object utilities
 */
export const object = {
  /**
   * Deep clones an object
   * 
   * @param obj - Object to clone
   * @returns Cloned object
   */
  deepClone: <T>(obj: T): T => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime()) as T;
    if (obj instanceof Array) return obj.map(item => object.deepClone(item)) as T;
    if (typeof obj === 'object') {
      const cloned: Record<string, unknown> = {};
      Object.keys(obj).forEach(key => {
        cloned[key] = object.deepClone((obj as Record<string, unknown>)[key]);
      });
      return cloned as T;
    }
    return obj;
  },

  /**
   * Checks if an object is empty
   * 
   * @param obj - Object to check
   * @returns True if object is empty
   */
  isEmpty: (obj: unknown): boolean => {
    if (obj == null) return true;
    if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0;
    if (obj instanceof Map || obj instanceof Set) return obj.size === 0;
    return Object.keys(obj).length === 0;
  },

  /**
   * Picks specified keys from an object
   * 
   * @param obj - Source object
   * @param keys - Keys to pick
   * @returns Object with picked keys
   */
  pick: <T extends Record<string, unknown>, K extends keyof T>(
    obj: T, 
    keys: K[]
  ): Pick<T, K> => {
    const result = {} as Pick<T, K>;
    keys.forEach(key => {
      if (key in obj) {
        result[key] = obj[key];
      }
    });
    return result;
  },

  /**
   * Omits specified keys from an object
   * 
   * @param obj - Source object
   * @param keys - Keys to omit
   * @returns Object without omitted keys
   */
  omit: <T extends Record<string, unknown>, K extends keyof T>(
    obj: T, 
    keys: K[]
  ): Omit<T, K> => {
    const result = { ...obj };
    keys.forEach(key => {
      delete result[key];
    });
    return result;
  },
};

/**
 * Async utilities
 */
export const async = {
  /**
   * Delays execution for specified milliseconds
   * 
   * @param ms - Milliseconds to delay
   * @returns Promise that resolves after delay
   */
  delay: (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  /**
   * Retries an async function with exponential backoff
   * 
   * @param fn - Function to retry
   * @param maxRetries - Maximum number of retries
   * @param baseDelay - Base delay in milliseconds
   * @returns Promise with function result
   */
  retry: async <T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> => {
    let lastError: Error = new Error('Max retries exceeded');
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < maxRetries) {
          const delay = baseDelay * Math.pow(2, attempt);
          await async.delay(delay);
        }
      }
    }
    
    throw lastError;
  },

  /**
   * Creates a debounced function
   * 
   * @param fn - Function to debounce
   * @param delay - Delay in milliseconds
   * @returns Debounced function
   */
  debounce: <T extends (...args: unknown[]) => unknown>(
    fn: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  },

  /**
   * Creates a throttled function
   * 
   * @param fn - Function to throttle
   * @param delay - Delay in milliseconds
   * @returns Throttled function
   */
  throttle: <T extends (...args: unknown[]) => unknown>(
    fn: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let lastCall = 0;
    
    return (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        fn(...args);
      }
    };
  },
};
