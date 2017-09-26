import { HttpRequest } from './models/http-request';
import { HttpResponse } from './models/http-response';
import { Context } from './models/context';

export { Context, HttpRequest, HttpResponse };

export function mock(context: Context, req: HttpRequest): any {
  const res: HttpResponse = {
    status: 200,
    body: req.body.name || ''
  };

  context.done(undefined, res);
}
