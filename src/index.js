#!/usr/bin/env node

import yargs from 'yargs';
import {
  addPath,
  checkPaths,
  removePath,
  printCheckPath,
  printCheckError,
  printRemoveError,
  printRemoveSuccess,
  printAddError,
  printAddSuccess,
} from './modules';

/**
 * Main
 */
async function main() {
  if (yargs.argv.add) {
    addPath(yargs.argv.add)
      .then(() => {
        printAddSuccess();
      })
      .catch((error) => {
        printAddError(error.message);
      });
  } else if (yargs.argv.remove) {
    removePath(yargs.argv.remove)
      .then(() => {
        printRemoveSuccess();
      })
      .catch((error) => {
        printRemoveError(error.message);
      });
  } else {
    checkPaths()
      .then((paths) => {
        paths.forEach((element) => printCheckPath(element));
      })
      .catch((error) => {
        printCheckError(error.message);
      });
  }
}

main();
