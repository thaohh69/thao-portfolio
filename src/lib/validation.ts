/**
 * Validation Utilities
 * 
 * Form validation helpers, input sanitization utilities, and form state
 * management helpers for consistent validation across the application.
 */

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

/**
 * Field validation result
 */
export interface FieldValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

/**
 * Validation rule interface
 */
export interface ValidationRule<T = unknown> {
  validate: (value: T) => FieldValidationResult;
  message?: string;
}

/**
 * Form validation schema
 */
export type ValidationSchema<T extends Record<string, unknown>> = {
  [K in keyof T]?: ValidationRule<T[K]>[];
};

/**
 * Email validation regex pattern
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * URL validation regex pattern
 */
const URL_REGEX = /^https?:\/\/(?:[-\w.])+(?:\:[0-9]+)?(?:\/(?:[\w\/_.])*(?:\?(?:[\w&=%.])*)?(?:\#(?:[\w.])*)?)?$/;

/**
 * Phone number validation regex pattern (international format)
 */
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

/**
 * Basic validation rules
 */
export const validationRules = {
  /**
   * Required field validation
   */
  required: (message: string = 'This field is required'): ValidationRule<unknown> => ({
    validate: (value: unknown) => {
      const isEmpty = value === undefined || 
                     value === null || 
                     value === '' || 
                     (Array.isArray(value) && value.length === 0) ||
                     (typeof value === 'object' && Object.keys(value).length === 0);
      
      return {
        isValid: !isEmpty,
        error: isEmpty ? message : undefined,
      };
    },
    message,
  }),

  /**
   * Email validation
   */
  email: (message: string = 'Please enter a valid email address'): ValidationRule<string> => ({
    validate: (value: string) => {
      if (!value) return { isValid: true }; // Allow empty for optional fields
      
      const isValid = EMAIL_REGEX.test(value.trim().toLowerCase());
      return {
        isValid,
        error: isValid ? undefined : message,
      };
    },
    message,
  }),

  /**
   * URL validation
   */
  url: (message: string = 'Please enter a valid URL'): ValidationRule<string> => ({
    validate: (value: string) => {
      if (!value) return { isValid: true }; // Allow empty for optional fields
      
      const isValid = URL_REGEX.test(value.trim());
      return {
        isValid,
        error: isValid ? undefined : message,
      };
    },
    message,
  }),

  /**
   * Phone number validation
   */
  phone: (message: string = 'Please enter a valid phone number'): ValidationRule<string> => ({
    validate: (value: string) => {
      if (!value) return { isValid: true }; // Allow empty for optional fields
      
      const cleanValue = value.replace(/[\s\-\(\)]/g, '');
      const isValid = PHONE_REGEX.test(cleanValue);
      return {
        isValid,
        error: isValid ? undefined : message,
      };
    },
    message,
  }),

  /**
   * Minimum length validation
   */
  minLength: (
    min: number, 
    message?: string
  ): ValidationRule<string> => ({
    validate: (value: string) => {
      if (!value) return { isValid: true }; // Allow empty for optional fields
      
      const isValid = value.length >= min;
      return {
        isValid,
        error: isValid ? undefined : (message || `Must be at least ${min} characters long`),
      };
    },
    message: message || `Must be at least ${min} characters long`,
  }),

  /**
   * Maximum length validation
   */
  maxLength: (
    max: number, 
    message?: string
  ): ValidationRule<string> => ({
    validate: (value: string) => {
      if (!value) return { isValid: true }; // Allow empty for optional fields
      
      const isValid = value.length <= max;
      return {
        isValid,
        error: isValid ? undefined : (message || `Must be no more than ${max} characters long`),
      };
    },
    message: message || `Must be no more than ${max} characters long`,
  }),

  /**
   * Pattern validation
   */
  pattern: (
    regex: RegExp, 
    message: string = 'Invalid format'
  ): ValidationRule<string> => ({
    validate: (value: string) => {
      if (!value) return { isValid: true }; // Allow empty for optional fields
      
      const isValid = regex.test(value);
      return {
        isValid,
        error: isValid ? undefined : message,
      };
    },
    message,
  }),

  /**
   * Numeric validation
   */
  numeric: (message: string = 'Must be a valid number'): ValidationRule<string | number> => ({
    validate: (value: string | number) => {
      if (value === '' || value === undefined || value === null) {
        return { isValid: true }; // Allow empty for optional fields
      }
      
      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      const isValid = !isNaN(numValue) && isFinite(numValue);
      return {
        isValid,
        error: isValid ? undefined : message,
      };
    },
    message,
  }),

  /**
   * Minimum value validation
   */
  min: (
    minValue: number, 
    message?: string
  ): ValidationRule<string | number> => ({
    validate: (value: string | number) => {
      if (value === '' || value === undefined || value === null) {
        return { isValid: true }; // Allow empty for optional fields
      }
      
      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      if (isNaN(numValue)) return { isValid: false, error: 'Must be a valid number' };
      
      const isValid = numValue >= minValue;
      return {
        isValid,
        error: isValid ? undefined : (message || `Must be at least ${minValue}`),
      };
    },
    message: message || `Must be at least ${minValue}`,
  }),

  /**
   * Maximum value validation
   */
  max: (
    maxValue: number, 
    message?: string
  ): ValidationRule<string | number> => ({
    validate: (value: string | number) => {
      if (value === '' || value === undefined || value === null) {
        return { isValid: true }; // Allow empty for optional fields
      }
      
      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      if (isNaN(numValue)) return { isValid: false, error: 'Must be a valid number' };
      
      const isValid = numValue <= maxValue;
      return {
        isValid,
        error: isValid ? undefined : (message || `Must be no more than ${maxValue}`),
      };
    },
    message: message || `Must be no more than ${maxValue}`,
  }),

  /**
   * Custom validation rule
   */
  custom: <T>(
    validator: (value: T) => boolean | string,
    message: string = 'Invalid value'
  ): ValidationRule<T> => ({
    validate: (value: T) => {
      const result = validator(value);
      
      if (typeof result === 'boolean') {
        return {
          isValid: result,
          error: result ? undefined : message,
        };
      }
      
      // If validator returns a string, it's an error message
      return {
        isValid: false,
        error: result,
      };
    },
    message,
  }),
};

/**
 * Validates a single field against multiple rules
 * 
 * @param value - Field value to validate
 * @param rules - Array of validation rules
 * @returns Field validation result
 */
export function validateField<T>(
  value: T,
  rules: ValidationRule<T>[]
): FieldValidationResult {
  for (const rule of rules) {
    const result = rule.validate(value);
    if (!result.isValid) {
      return result;
    }
  }
  
  return { isValid: true };
}

/**
 * Validates an entire form against a schema
 * 
 * @param data - Form data to validate
 * @param schema - Validation schema
 * @returns Validation result with all errors
 */
export function validateForm<T extends Record<string, unknown>>(
  data: T,
  schema: ValidationSchema<T>
): ValidationResult & { fieldErrors: Record<keyof T, string | undefined> } {
  const errors: string[] = [];
  const fieldErrors: Record<keyof T, string | undefined> = {} as Record<keyof T, string | undefined>;
  let isValid = true;

  Object.keys(schema).forEach((fieldName) => {
    const field = fieldName as keyof T;
    const rules = schema[field];
    
    if (rules) {
      const fieldResult = validateField(data[field], rules);
      
      if (!fieldResult.isValid) {
        isValid = false;
        const errorMessage = fieldResult.error || `Invalid ${String(field)}`;
        errors.push(errorMessage);
        fieldErrors[field] = errorMessage;
      }
    }
  });

  return {
    isValid,
    errors,
    fieldErrors,
  };
}

/**
 * Input sanitization utilities
 */
export const sanitize = {
  /**
   * Sanitizes HTML to prevent XSS attacks
   */
  html: (input: string): string => {
    const entityMap: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;',
    };
    
    return input.replace(/[&<>"'`=\/]/g, (char) => entityMap[char] || char);
  },

  /**
   * Sanitizes SQL to prevent injection
   */
  sql: (input: string): string => {
    return input.replace(/['"\\;]/g, '\\$&');
  },

  /**
   * Sanitizes email input
   */
  email: (input: string): string => {
    return input.trim().toLowerCase();
  },

  /**
   * Sanitizes phone number
   */
  phone: (input: string): string => {
    return input.replace(/[^\d\+\-\(\)\s]/g, '');
  },

  /**
   * Sanitizes URL
   */
  url: (input: string): string => {
    const trimmed = input.trim();
    // Add protocol if missing
    if (trimmed && !trimmed.match(/^https?:\/\//)) {
      return `https://${trimmed}`;
    }
    return trimmed;
  },

  /**
   * Sanitizes string for use in URLs (slug)
   */
  slug: (input: string): string => {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  /**
   * Removes extra whitespace
   */
  whitespace: (input: string): string => {
    return input.trim().replace(/\s+/g, ' ');
  },

  /**
   * Sanitizes filename
   */
  filename: (input: string): string => {
    return input.replace(/[^a-zA-Z0-9.-]/g, '_');
  },
};

/**
 * Common validation schemas
 */
export const schemas = {
  /**
   * Contact form validation schema
   */
  contact: {
    name: [
      validationRules.required('Name is required'),
      validationRules.minLength(2, 'Name must be at least 2 characters'),
      validationRules.maxLength(100, 'Name must be less than 100 characters'),
    ],
    email: [
      validationRules.required('Email is required'),
      validationRules.email(),
    ],
    subject: [
      validationRules.required('Subject is required'),
      validationRules.minLength(5, 'Subject must be at least 5 characters'),
      validationRules.maxLength(200, 'Subject must be less than 200 characters'),
    ],
    message: [
      validationRules.required('Message is required'),
      validationRules.minLength(10, 'Message must be at least 10 characters'),
      validationRules.maxLength(1000, 'Message must be less than 1000 characters'),
    ],
  },

  /**
   * User profile validation schema
   */
  profile: {
    firstName: [
      validationRules.required('First name is required'),
      validationRules.minLength(2),
      validationRules.maxLength(50),
    ],
    lastName: [
      validationRules.required('Last name is required'),
      validationRules.minLength(2),
      validationRules.maxLength(50),
    ],
    email: [
      validationRules.required('Email is required'),
      validationRules.email(),
    ],
    phone: [
      validationRules.phone(),
    ],
    website: [
      validationRules.url(),
    ],
  },
};

/**
 * Form state management helper
 */
export class FormValidator<T extends Record<string, unknown>> {
  private schema: ValidationSchema<T>;
  private errors: Record<keyof T, string | undefined> = {} as Record<keyof T, string | undefined>;
  private touched: Record<keyof T, boolean> = {} as Record<keyof T, boolean>;

  constructor(schema: ValidationSchema<T>) {
    this.schema = schema;
  }

  /**
   * Validates a single field
   */
  validateField(field: keyof T, value: T[keyof T]): FieldValidationResult {
    const rules = this.schema[field];
    if (!rules) return { isValid: true };

    const result = validateField(value, rules);
    
    if (result.error) {
      this.errors[field] = result.error;
    } else {
      delete this.errors[field];
    }

    return result;
  }

  /**
   * Validates all fields
   */
  validateAll(data: T): ValidationResult {
    const result = validateForm(data, this.schema);
    this.errors = result.fieldErrors;
    return result;
  }

  /**
   * Marks a field as touched
   */
  touch(field: keyof T): void {
    this.touched[field] = true;
  }

  /**
   * Gets error for a field (only if touched)
   */
  getFieldError(field: keyof T): string | undefined {
    return this.touched[field] ? this.errors[field] : undefined;
  }

  /**
   * Checks if form has any errors
   */
  hasErrors(): boolean {
    return Object.values(this.errors).some(error => error !== undefined);
  }

  /**
   * Gets all errors
   */
  getErrors(): Record<keyof T, string | undefined> {
    return { ...this.errors };
  }

  /**
   * Clears all errors and touched state
   */
  reset(): void {
    this.errors = {} as Record<keyof T, string | undefined>;
    this.touched = {} as Record<keyof T, boolean>;
  }
}