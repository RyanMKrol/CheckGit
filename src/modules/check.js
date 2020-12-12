import shell from 'shelljs';

import { GitMissing } from './errors';
import { info } from './constants';
import readPaths from './read';

/**
 * Checks the paths currently configured and messages the user if any commits need pushing
 *
 * @returns {Array.<string>} Array of paths that need pushing
 */
async function checkPaths() {
  if (!shell.which('git')) {
    throw new GitMissing('Please install git before using this tool');
  }

  const pathsToCheck = await readPaths();

  return pathsToCheck
    .map((path) => {
      info(`Checking path: ${path}`);

      const result = shell.exec(`git -C ${path} status`, { silent: false });

      const needsPushing = result.stdout.includes('Your branch is ahead');

      info(`Does this path need pushing?: ${needsPushing ? 'Yes' : 'No'}`);

      return needsPushing ? path : undefined;
    })
    .filter((x) => x);
}

export default checkPaths;
