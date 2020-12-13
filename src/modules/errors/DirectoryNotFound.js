/**
 * Error used when we failed to find the directory we're working on
 */
class DirectoryNotFound extends Error {
  /**
   * @param {...any} params Params to pass to super object
   */
  constructor(...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DirectoryNotFound);
    }

    this.Error = 'DirectoryNotFound';
    this.StatusCode = 500;
  }
}

export default DirectoryNotFound;
