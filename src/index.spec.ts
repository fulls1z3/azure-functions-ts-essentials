import { Context } from './models/context';
import { HttpMethod } from './models/http-method';
import { HttpRequest } from './models/http-request';
import { HttpResponse } from './models/http-response';
import { HttpStatusCode } from './models/http-status-code';

function mock(context: Context, req: HttpRequest): any {
  let res: HttpResponse;

  if ((req.query && req.query.name) || (req.body && req.body.name))
    res = {
      status: HttpStatusCode.OK,
      body: `Hello ${(req.query && req.query.name) || req.body.name}`
    };
  else
    res = {
      status: HttpStatusCode.BadRequest,
      body: 'Please pass a name on the query string or in the request body.'
    };

  context.done(undefined, res);
}

const testData: { name: string } = {
  name: 'Azure'
};

describe('azure-functions-ts-essentials', () => {
  describe('mock', () => {
    it('should be able to return success code w/request body', () => {
      const mockContext: Context = {
        done: (err, response) => {
          expect(err).toBeUndefined();

          expect((response as HttpResponse).status).toEqual(HttpStatusCode.OK);
          expect((response as HttpResponse).body).toEqual(`Hello ${testData.name}`);
        }
      };

      const mockRequest: HttpRequest = {
        method: HttpMethod.Post,
        params: {},
        query: {},
        body: testData
      };

      mock(mockContext, mockRequest);
    });

    it('should be able to return success code w/request query', () => {
      const mockContext: Context = {
        done: (err, response) => {
          expect(err).toBeUndefined();

          expect((response as HttpResponse).status).toEqual(HttpStatusCode.OK);
          expect((response as HttpResponse).body).toEqual(`Hello ${testData.name}`);
        }
      };

      const mockRequest: HttpRequest = {
        method: HttpMethod.Get,
        params: {},
        query: testData,
        body: {}
      };

      mock(mockContext, mockRequest);
    });

    it('should not return success code w/o any input', () => {
      const mockContext: Context = {
        done: (err, response) => {
          expect(err).toBeUndefined();

          expect((response as HttpResponse).status).toEqual(HttpStatusCode.BadRequest);
          expect((response as HttpResponse).body).toEqual('Please pass a name on the query string or in the request body.');
        }
      };

      const mockRequest: HttpRequest = {
        method: HttpMethod.Get,
        params: {},
        query: {},
        body: {}
      };

      mock(mockContext, mockRequest);
    });
  });
});
