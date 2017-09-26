import { HttpResponse } from './http-response';

export interface Context {
  log(...message: Array<any>): void;
  done(err: Error | undefined, res: HttpResponse): void;
}
