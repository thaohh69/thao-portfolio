/**
 * API-related type definitions for the AI Portfolio application
 */

// Base API Types
export interface ApiResponse<TData = unknown> {
  success: boolean;
  data?: TData;
  error?: string;
  message?: string;
  timestamp?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, unknown>;
}

// HTTP Request Types
export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  cache?: boolean;
}

// Request Body Types
export type RequestBody = 
  | Record<string, unknown>
  | FormData
  | string
  | null;

// API Client Types
export interface ApiClientOptions {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  retries?: number;
}

// Validation Types
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface ValidationRule<T = unknown> {
  validate: (value: T) => boolean;
  message: string;
}

// Tool Result Types (for chat tools)
export interface ToolResult<TData = unknown> {
  toolCallId: string;
  toolName: string;
  result?: TData;
  status: 'pending' | 'success' | 'error';
  error?: string;
}

// Specific API Response Types
export interface GitHubStarsResponse {
  stars: number;
  lastUpdated: string;
  url?: string;
}

export interface VisitCountResponse {
  count: number;
  isUnique: boolean;
  timestamp: string;
}

// Chat API Types
export interface ChatToolCall {
  toolCallId: string;
  toolName: string;
  args: Record<string, unknown>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  parts?: ChatMessagePart[];
  metadata?: Record<string, unknown>;
}

export interface ChatMessagePart {
  type: 'text' | 'tool-invocation' | 'tool-result';
  text?: string;
  toolInvocation?: {
    toolCallId: string;
    toolName: string;
    args: Record<string, unknown>;
    state: 'pending' | 'result' | 'error';
  };
  toolResult?: {
    toolCallId: string;
    result: unknown;
  };
}

// Error Handling Types
export enum ApiErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR', 
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  RATE_LIMITED = 'RATE_LIMITED',
  TIMEOUT = 'TIMEOUT'
}

export interface ApiErrorDetails {
  type: ApiErrorType;
  message: string;
  status: number;
  details?: Record<string, unknown>;
  retry?: boolean;
}