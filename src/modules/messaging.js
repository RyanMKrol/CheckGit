/* eslint-disable no-console */

import chalk from 'chalk';

/**
 * Util for printing when we fail to check paths for unpushed commits
 *
 * @param {string} message Error message associated with the failure
 */
function printCheckError(message) {
  console.log(chalk.bold.red(`Failed to check paths for unpushed commits - ${message}`));
}

/**
 * Util for printing which paths needs pushing
 *
 * @param {string} paths Paths to print
 */
function printCheckSuccess(paths) {
  paths.forEach((path) => console.log(
    chalk.underline.bold.blue('You have a branch to push')
        + chalk.underline.yellow(' - ')
        + chalk.underline.green(path),
  ));
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

/**
 * Util for printing when we fail to list the paths to check
 *
 * @param {string} message Any custom error message to write out
 */
function printListError(message) {
  console.log(chalk.bold.red(`Failed to read paths to check - ${message}`));
}

/**
 * Util for printing paths when we successfully read them
 *
 * @param {Array.<string>} paths Paths to print out
 */
function printListSuccess(paths) {
  console.log(chalk.bold.black('Current paths:'));
  paths.forEach((path) => console.log(chalk.gray(path)));
}

export {
  printCheckError,
  printCheckSuccess,
  printRemoveError,
  printRemoveSuccess,
  printAddError,
  printAddSuccess,
  printListError,
  printListSuccess,
};
