import fs from 'fs';
import util from 'util';

import { info, error, PATHS_STORAGE_FILENAME } from './constants';
import readPaths from './read';

const open = util.promisify(fs.open);
const writeFile = util.promisify(fs.writeFile);

/**
 * Adds the paths to paths that want to check
 *
 * @param {string} path The path of a folder to check when running this tool
 */
async function addPath(path) {
  info(`Adding this path to list of folders to check: ${path}`);

  const pathsToWrite = await readPaths();

  pathsToWrite.push(path);

  await open(PATHS_STORAGE_FILENAME, 'w')
    .then(async (fd) => {
      info(`Storing paths: ${pathsToWrite}`);
      await writeFile(fd, JSON.stringify(pathsToWrite));
    })
    .catch((e) => {
      error('Failed to write, with error: %O', e);
      throw new Error(`Could not open the file for writing ${e.toString()}`);
    });
}

export default addPath;
