import { HttpRequest } from './http-request';
import { HttpResponse } from './http-response';

/**
 * Represents an HTTP context.
 */
export interface Context {
  invocationId?: string;
  executionContext?: any;
  bindings?: any;
  req?: HttpRequest;
  bindingData?: any;
  res?: HttpResponse;

  /**
   * Allows writing to the streaming console logs.
   */
  log?: {
    (...message: Array<any>): void,
    error(...message: Array<any>): void,
    warn(...message: Array<any>): void,
    info(...message: Array<any>): void,
    verbose(...message: Array<any>): void,
    metric(...message: Array<any>): void,
  };

  /**
   * Creates a new bound function.
   *
   * @param args
   */
  bind?(...args: Array<any>): void;

  /**
   * Allows writing to the streaming console logs.
   *
   * @param message
   */
  // log(...message: Array<any>): void;

  /**
   * Informs the runtime that the function execution has finished.
   *
   * @param {Error} err
   * @param {HttpResponse} propertyBag
   */
  done(err?: Error | undefined, propertyBag?: { [key: string]: any }): void;
}
