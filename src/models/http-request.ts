import { HttpMethod } from './http-method';

export interface HttpRequest {
  method: HttpMethod;
  params: any;
  query: any;
  body: any;
}
