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

/**
 * Util for printing when we fail to remove an item from storage
 *
 * @param {string} message Any custom error message to write out
 */
function printRemoveError(message) {
  console.log(chalk.bold.red(`Failed to remove item - ${message}`));
}

/**
 * Util for printing when we succeed in removing an item from storage
 */
function printRemoveSuccess() {
  console.log(chalk.bold.green('Removed path successfully!'));
}

/**
 * Util for printing when we fail to add an item to storage
 *
 * @param {string} message Any custom error message to write out
 */
function printAddError(message) {
  console.log(chalk.bold.red(`Failed to add item - ${message}`));
}

/**
 * Util for printing when we succeed in adding an item to storage
 */
function printAddSuccess() {
  console.log(chalk.bold.green('Added path successfully!'));
}

export {
  printPath, printRemoveError, printRemoveSuccess, printAddError, printAddSuccess,
};
