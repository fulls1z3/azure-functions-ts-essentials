import { HttpRequest } from './models/http-request';
import { Context } from './models/context';
import { mock } from './index';

test('Http trigger with body success', () => {
  const mockContext: Context = {
    done: (err, response) => {
      expect(err).toBeUndefined();

      expect(response.status).toBe(200);
      expect(response.body).toBe('');
    },
    log: () => {/**/}
  };

  const mockRequest: HttpRequest = {
    body: {},
    query: {}
  };

  mock(mockContext, mockRequest);
});
