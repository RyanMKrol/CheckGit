/**
 * Error used when we failed to remove an item
 */
class FailedRemoval extends Error {
  /**
   * @param {...any} params Params to pass to super object
   */
  constructor(...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FailedRemoval);
    }

    this.Error = 'FailedRemoval';
    this.StatusCode = 500;
  }
}

export default FailedRemoval;
