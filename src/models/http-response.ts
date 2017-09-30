import { HttpStatusCode } from './http-status-code';

/**
 * Represents a HTTP response including the status code and data.
 */
export interface HttpResponse {
  status: HttpStatusCode;
  body: any;
}
