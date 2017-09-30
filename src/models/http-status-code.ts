/**
 * Contains the values of status codes defined for HTTP.
 */
export enum HttpStatusCode {
  /**
   * Indicates that the client can continue with its request.
   */
  Continue = 100,
  /**
   * Indicates that the protocol version or protocol is being changed.
   */
  SwitchingProtocols = 101,
  /**
   * Indicates that the request succeeded and that the requested information is in the response.
   */
  OK = 200,
  /**
   * Indicates that the request resulted in a new resource created before the response was sent.
   */
  Created = 201,
  /**
   * Indicates that the request has been accepted for further processing.
   */
  Accepted = 202,
  /**
   * Indicates that the returned meta information is from a cached copy instead of the origin server and therefore may be
   * incorrect.
   */
  NonAuthoritativeInformation = 203,
  /**
   * Indicates that the request has been successfully processed and that the response is intentionally blank.
   */
  NoContent = 204,
  /**
   * Indicates that the client should reset (not reload) the current resource.
   */
  ResetContent = 205,
  /**
   * Indicates that the response is a partial response as requested by a GET request that includes a byte range.
   */
  PartialContent = 206,
  /**
   * Indicates that the requested information has multiple representations.
   *
   * The default action is to treat this status as a redirect and follow the contents of the Location header associated
   * with this response.
   */
  MultipleChoices = 300,
  /**
   * Indicates that the requested information has multiple representations.
   *
   * The default action is to treat this status as a redirect and follow the contents of the Location header associated
   * with this response.
   */
  Ambiguous = 300,
  /**
   * Indicates that the requested information has been moved to the URI specified in the Location header.
   *
   * The default action when this status is received is to follow the Location header associated with the response.
   */
  MovedPermanently = 301,
  /**
   * Indicates that the requested information has been moved to the URI specified in the Location header.
   *
   * The default action when this status is received is to follow the Location header associated with the response.
   * When the original request method was POST, the redirected request will use the GET method.
   */
  Moved = 301,
  /**
   * Indicates that the requested information is located at the URI specified in the Location header.
   *
   * The default action when this status is received is to follow the Location header associated with the response.
   * When the original request method was POST, the redirected request will use the GET method.
   */
  Found = 302,
  /**
   * Indicates that the requested information is located at the URI specified in the Location header.
   *
   * The default action when this status is received is to follow the Location header associated with the response.
   * When the original request method was POST, the redirected request will use the GET method.
   */
  Redirect = 302,
  /**
   * Automatically redirects the client to the URI specified in the Location header as the result of a POST.
   *
   * The request to the resource specified by the Location header will be made with a GET.
   */
  SeeOther = 303,
  /**
   * Automatically redirects the client to the URI specified in the Location header as the result of a POST.
   *
   * The request to the resource specified by the Location header will be made with a GET.
   */
  RedirectMethod = 303,
  /**
   * Indicates that the client's cached copy is up to date.
   *
   * The contents of the resource are not transferred.
   */
  NotModified = 304,
  /**
   * Indicates that the request should use the proxy server at the URI specified in the Location header.
   */
  UseProxy = 305,
  /**
   * A proposed extension to the HTTP/1.1 specification that is not fully specified.
   */
  Unused = 306,
  /**
   * Indicates that the request information is located at the URI specified in the Location header.
   *
   * The default action when this status is received is to follow the Location header associated with the response.
   * When the original request method was POST, the redirected request will also use the POST method.
   */
  TemporaryRedirect = 307,
  /**
   * Indicates that the request information is located at the URI specified in the Location header.
   *
   * The default action when this status is received is to follow the Location header associated with the response.
   * When the original request method was POST, the redirected request will also use the POST method.
   */
  RedirectKeepVerb = 307,
  /**
   * Indicates that the request could not be understood by the server.
   *
   * The HTTP 400 (BadRequest) is sent when no other error is applicable, or if the exact error is unknown or does not
   * have its own error code.
   */
  BadRequest = 400,
  /**
   * Indicates that the requested resource requires authentication.
   *
   * The WWW-Authenticate header contains the details of how to perform the authentication.
   */
  Unauthorized = 401,
  /**
   * Reserved for future use.
   */
  PaymentRequired = 402,
  /**
   * Indicates that the server refuses to fulfill the request.
   */
  Forbidden = 403,
  /**
   * Indicates that the requested resource does not exist on the server.
   */
  NotFound = 404,
  /**
   * Indicates that the request method (POST or GET) is not allowed on the requested resource.
   */
  MethodNotAllowed = 405,
  /**
   * Indicates that the client has indicated with Accept headers that it will not accept any of the available
   * representations of the resource.
   */
  NotAcceptable = 406,
  /**
   * Indicates that the requested proxy requires authentication.
   *
   * The Proxy-authenticate header contains the details of how to perform the authentication.
   */
  ProxyAuthenticationRequired = 407,
  /**
   * Indicates that the client did not send a request within the time the server was expecting the request.
   */
  RequestTimeout = 408,
  /**
   * Indicates that the request could not be carried out because of a conflict on the server.
   */
  Conflict = 409,
  /**
   * Indicates that the requested resource is no longer available.
   */
  Gone = 410,
  /**
   * Indicates that the required Content-length header is missing.
   */
  LengthRequired = 411,
  /**
   * Indicates that a condition set for this request failed, and the request cannot be carried out.
   *
   * Conditions are set with conditional request headers like If-Match, If-None-Match, or If-Unmodified-Since.
   */
  PreconditionFailed = 412,
  /**
   * Indicates that the request is too large for the server to process.
   */
  RequestEntityTooLarge = 413,
  /**
   * Indicates that the URI is too long.
   */
  RequestUriTooLong = 414,
  /**
   * Indicates that the request is an unsupported type.
   */
  UnsupportedMediaType = 415,
  /**
   * Indicates that the range of data requested from the resource cannot be returned, either because the beginning of
   * the range is before the beginning of the resource, or the end of the range is after the end of the resource.
   */
  RequestedRangeNotSatisfiable = 416,
  /**
   * Indicates that an expectation given in an Expect header could not be met by the server.
   */
  ExpectationFailed = 417,
  /**
   * Indicates that the client should switch to a different protocol such as TLS/1.0.
   */
  UpgradeRequired = 426,
  /**
   * Indicates that a generic error has occurred on the server.
   */
  InternalServerError = 500,
  /**
   * Indicates that the server does not support the requested function.
   */
  NotImplemented = 501,
  /**
   * Indicates that an intermediate proxy server received a bad response from another proxy or the origin server.
   */
  BadGateway = 502,
  /**
   * Indicates that the server is temporarily unavailable, usually due to high load or maintenance.
   */
  ServiceUnavailable = 503,
  /**
   * Indicates that an intermediate proxy server timed out while waiting for a response from another proxy or the origin
   * server.
   */
  GatewayTimeout = 504,
  /**
   * Indicates that the requested HTTP version is not supported by the server.
   */
  HttpVersionNotSupported = 505
}
