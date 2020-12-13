#!/usr/bin/env node

import yargs from 'yargs';
import {
  addPath,
  checkPaths,
  readPaths,
  removePath,
  printCheckSuccess,
  printCheckError,
  printRemoveError,
  printRemoveSuccess,
  printAddError,
  printAddSuccess,
  printListError,
  printListSuccess,
} from './modules';

/**
 * Main
 */
async function main() {
  if (yargs.argv.add) {
    addPath(yargs.argv.add, yargs.argv.depth)
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
  } else if (yargs.argv.list) {
    readPaths()
      .then((paths) => {
        printListSuccess(paths);
      })
      .catch((error) => {
        printListError(error.message);
      });
  } else {
    checkPaths()
      .then((paths) => {
        printCheckSuccess(paths);
      })
      .catch((error) => {
        printCheckError(error.message);
      });
  }
}

main();
