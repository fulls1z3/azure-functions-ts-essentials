import { HttpMethod } from './http-method';

/**
 * Represents an HTTP request.
 */
export interface HttpRequest {
  originalUrl?: string;
  method: HttpMethod;
  query?: { [key: string]: any; };
  headers?: { [key: string]: any; };
  body?: any;
  params?: { [key: string]: any; };
  rawBody?: any;
}
