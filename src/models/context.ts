import { HttpResponse } from './http-response';

/**
 * Represents an Azure Function context.
 */
export interface Context {
  log(...message: Array<any>): void;
  done(err: Error | undefined, res: HttpResponse): void;
}
