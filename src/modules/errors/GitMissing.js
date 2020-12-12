/**
 * Error used when the machine doesn't have git installed
 */
class GitMissing extends Error {
  /**
   * @param {...any} params Params to pass to super object
   */
  constructor(...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GitMissing);
    }

    this.Error = 'GitMissing';
    this.StatusCode = 500;
  }
}

export default GitMissing;
