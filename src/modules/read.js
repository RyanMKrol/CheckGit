import fs from 'fs';
import util from 'util';

import { info, error, PATHS_STORAGE_FILENAME } from './constants';

const open = util.promisify(fs.open);
const readFile = util.promisify(fs.readFile);

/**
 * Reads the paths that are stored locally
 *
 * @returns {Array.<string>} Array of paths to check
 */
async function readPaths() {
  info('Reading the current paths in storage');

  return open(PATHS_STORAGE_FILENAME, 'a+')
    .then(async (fd) => {
      const readData = await readFile(fd);
      const currentPaths = readData.length > 0 ? JSON.parse(readData) : [];

      info(`Current paths: ${currentPaths}`);

      return currentPaths;
    })
    .catch((e) => {
      error('Failed to read, with error: %O', e);
      throw new Error(`Could not open the file for reading ${e.toString()}`);
    });
}

export default readPaths;
