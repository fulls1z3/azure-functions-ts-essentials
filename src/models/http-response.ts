import { HttpStatusCode } from './http-status-code';

/**
 * Represents an HTTP response including the status code and data.
 */
export interface HttpResponse {
  status: HttpStatusCode | number;
  body: any;
  headers?: {
    'content-type'?: string;
    'content-length'?: HttpStatusCode | number;
    'content-disposition'?: string;
    'content-encoding'?: string;
    'content-language'?: string;
    'content-range'?: string;
    'content-location'?: string;
    'content-md5'?: Buffer;
    'expires'?: Date;
    'last-modified'?: Date;
    [key: string]: any;
  };
  isRaw?: boolean;
}
