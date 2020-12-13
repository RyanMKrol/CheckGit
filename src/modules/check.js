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

  return Promise.all(
    pathsToCheck.map(
      (path) => new Promise((resolve) => {
        info(`Checking path: ${path}`);

        const result = shell.exec(`git -C ${path} status`, { silent: true, async: true });

        result.stdout.on('data', (data) => {
          const needsPushing = data.includes('Your branch is ahead');

          info(`Does this path need pushing?: ${needsPushing ? 'Yes' : 'No'}`);

          if (needsPushing) {
            resolve(path);
          } else {
            resolve();
          }
        });
      }),
    ),
  ).then((paths) => paths.filter((x) => x));
}

export default checkPaths;
