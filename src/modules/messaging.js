/* eslint-disable no-console */

import chalk from 'chalk';

/**
 * Util for printing which path needs pushing
 *
 * @param {string} path Path to print
 */
function printPath(path) {
  console.log(
    chalk.underline.bold.blue('You have a branch to push')
      + chalk.underline.yellow(' - ')
      + chalk.underline.green(path),
  );
}

export default printPath;
