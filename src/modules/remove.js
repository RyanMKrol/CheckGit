import { info, error, PATHS_STORAGE_FILENAME } from './constants';
import readPaths from './read';
import { FailedRemoval } from './errors';
import { convertToAbsolute, openFile, writeFile } from './utils';

/**
 * Removes paths from list to be checked
 *
 * @param {string} path The path of a folder to remove from checking
 */
async function removePath(path) {
  const absolutePath = convertToAbsolute(path);

  info(`Removing this path to list of folders to check: ${absolutePath}`);

  const pathsToWrite = await readPaths();

  const indexOfPath = pathsToWrite.indexOf(absolutePath);

  if (indexOfPath === -1) {
    throw new FailedRemoval('Item does not exist');
  }

  pathsToWrite.splice(indexOfPath, 1);

  await openFile(PATHS_STORAGE_FILENAME, 'w')
    .then(async (fd) => {
      info(`Storing paths after removal: ${pathsToWrite}`);
      await writeFile(fd, JSON.stringify(pathsToWrite));
    })
    .catch((e) => {
      error('Failed to write, with error: %O', e);
      throw new FailedRemoval(`Could not open the file for writing ${e.toString()}`);
    });
}

export default removePath;
