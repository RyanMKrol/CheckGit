import fs from 'fs';
import util from 'util';
import nodePath from 'path';

import { info, error, PATHS_STORAGE_FILENAME } from './constants';
import readPaths from './read';

import FailedAddition from './errors';

const open = util.promisify(fs.open);
const writeFile = util.promisify(fs.writeFile);

/**
 * Adds the paths to paths that want to check
 *
 * @param {string} path The path of a folder to check when running this tool
 */
async function addPath(path) {
  const absolutePath = convertToAbsolute(path);

  info(`Adding this path to list of folders to check: ${absolutePath}`);

  const pathsToWrite = await readPaths();

  pathsToWrite.push(absolutePath);

  await open(PATHS_STORAGE_FILENAME, 'w')
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
 * Ensures that the path given to us can be used anywhere
 *
 * @param {string} path The path given to us by the user
 * @returns {string} The absolute path
 */
function convertToAbsolute(path) {
  return nodePath.isAbsolute(path) ? path : nodePath.resolve(process.cwd(), path);
}

export default addPath;
