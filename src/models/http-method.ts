export enum HttpMethod {
  /**
   * Represents an HTTP GET protocol method.
   */
  Get = 'GET',
  /**
   * Represents an HTTP POST protocol method that is used to post a new entity as an addition to a URI.
   */
  Post = 'POST',
  /**
   * Represents an HTTP DELETE protocol method.
   */
  Delete = 'DELETE',
  /**
   * Represents an HTTP HEAD protocol method.
   */
  Head = 'HEAD',
  /**
   * Represents an HTTP PATCH protocol method that is used to replace partially an entity identified by a URI.
   */
  Patch = 'PATCH',
  /**
   * Represents an HTTP PUT protocol method that is used to replace an entity identified by a URI.
   */
  Put = 'PUT',
  /**
   * Represents an HTTP OPTIONS protocol method.
   */
  Options = 'OPTIONS',
  /**
   * Represents an HTTP TRACE protocol method.
   */
  Trace = 'TRACE'
}
