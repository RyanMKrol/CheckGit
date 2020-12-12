/**
 * Error used when we failed to add an item
 */
class FailedAddition extends Error {
  /**
   * @param {...any} params
   */
  constructor(...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FailedAddition);
    }

    this.Error = 'FailedAddition';
    this.StatusCode = 500;
  }
}

export default FailedAddition;
