/**
 * Contains the values of error types due to a failure of an API request.
 */
export enum ErrorType {
  /**
   * Represents that the resource does not exist.
   */
  Missing = 'missing',
  /**
   * Represents that a required field on a resource has not been set.
   */
  MissingField = 'missing_field',
  /**
   * Represents that the formatting of a field is invalid.
   */
  Invalid = 'invalid',
  /**
   * Represents that another resource has the same value as this field.
   */
  AlreadyExists = 'already_exists'
}
