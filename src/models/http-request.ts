import { HttpMethod } from './http-method';

/**
 * Represents a HTTP request.
 */
export interface HttpRequest {
  method: HttpMethod;
  params: any;
  query: any;
  body: any;
}
