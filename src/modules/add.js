import fs from 'fs';

import { info, error, PATHS_STORAGE_FILENAME } from './constants';
import readPaths from './read';
import {
  convertToAbsolute, accessFile, openFile, writeFile,
} from './utils';
import { FailedAddition, DirectoryNotFound } from './errors';

/**
 * Adds the paths to paths that want to check
 *
 * @param {string} path The path of a folder to check when running this tool
 */
async function addPath(path) {
  const absolutePath = convertToAbsolute(path);

  info(`Adding this path to list of folders to check: ${absolutePath}`);

  if (!(await directoryExists(absolutePath))) {
    throw new DirectoryNotFound(`Could not find directory - ${absolutePath}`);
  }

  if (!(await isGitTracked(absolutePath))) {
    throw new Error(`Could not find git tracking for this directory - ${absolutePath}`);
  }

  const pathsToWrite = await readPaths();

  pathsToWrite.push(absolutePath);

  await openFile(PATHS_STORAGE_FILENAME, 'w')
    .then(async (fd) => {
      info(`Storing paths: ${pathsToWrite}`);
      await writeFile(fd, JSON.stringify(pathsToWrite));
    })
    .catch((e) => {
      error('Failed to write, with error: %O', e);
      throw new FailedAddition(`Could not open the file for writing ${e.toString()}`);
    });
}

/**
 * Determines if the path we're adding has a git folder or not
 *
 * @param {string} path The path to check
 */
function isGitTracked(path) {
  return accessFile(`${path}/.git`, fs.constants.F_OK)
    .then(() => 1)
    .catch(() => 0);
}

/**
 * Determines if the directory exists or not
 *
 * @param {string} path The path to check
 */
function directoryExists(path) {
  return accessFile(path, fs.constants.F_OK)
    .then(() => 1)
    .catch(() => 0);
}

export default addPath;
