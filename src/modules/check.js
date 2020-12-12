import shell from 'shelljs';

import { info, error } from './constants';
import readPaths from './read';

/**
 * Checks the paths currently configured and messages the user if any commits need pushing
 *
 * @returns {Array.<string>} Array of paths that need pushing
 */
async function checkPaths() {
  if (!shell.which('git')) {
    error('Sorry, this script requires git');
    shell.exit(1);
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
