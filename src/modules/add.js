import { info, error, PATHS_STORAGE_FILENAME } from './constants';
import readPaths from './read';
import { convertToAbsolute, openFile, writeFile } from './utils';
import FailedAddition from './errors';

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

export default addPath;
