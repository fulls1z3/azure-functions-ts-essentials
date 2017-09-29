import { HttpStatusCode } from './http-status-code';

export interface HttpResponse {
  status: HttpStatusCode;
  body: any;
}
