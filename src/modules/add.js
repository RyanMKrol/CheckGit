import fs from 'fs';

import { info, error, PATHS_STORAGE_FILENAME } from './constants';
import readPaths from './read';
import {
  asyncFilter,
  convertToAbsolute,
  accessFile,
  openFile,
  writeFile,
  removeArrayDuplicates,
  fileStats,
  readDir,
} from './utils';
import { FailedAddition, DirectoryNotFound } from './errors';

/**
 * Adds the path to paths that want to check
 *
 * @param {string} path The path of a folder to check when running this tool
 * @param {number} depth How many directories to dig into to find a .git directory
 */
async function addPath(path, depth = 0) {
  const absolutePath = convertToAbsolute(path);
  if (depth === 0) {
    await addDirectory(absolutePath);
  } else {
    const paths = await findEligiblePaths(absolutePath, depth);

    paths.reduce(
      (acc, pathToAdd) => acc.then(async () => {
        await addDirectory(pathToAdd);
      }),
      Promise.resolve(),
    );
  }
}

/**
 * Finds all paths eligible to be added up to a given depth
 *
 * @param {string} path The path to start with
 * @param {number} depth How deep to recurse
 * @param {Array.<string>} accumulator Current accumulator for recursive function
 */
async function findEligiblePaths(path, depth, accumulator = []) {
  if (depth === 0) {
    return accumulator;
  }

  const files = await readDir(path);
  const absoluteFilePaths = files.map((file) => convertToAbsolute(`${path}/${file}`));
  const directories = await asyncFilter(isDirectory, absoluteFilePaths);

  /**
   * Anonymous function for filtering valid directories
   *
   * @param {string} dir Path of directory to check
   * @returns {boolean} Whether a directory is valid or not
   */
  const filterPredicate = (dir) => isDirectoryValid(dir)
    .then(() => 1)
    .catch(() => 0);

  const eligible = await asyncFilter(filterPredicate, directories);

  const recursiveDirs = await Promise.all(
    directories.map((dir) => findEligiblePaths(dir, depth - 1, accumulator)),
  );

  return accumulator.concat(eligible).concat(recursiveDirs.flat());
}
/**
 * Adds the path to paths that want to check
 *
 * @param {string} path The path of a folder to check when running this tool
 * @param {number} depth How many directories to dig into to find a .git directory
 */
async function addDirectory(path) {
  info(`Adding this path to list of folders to check: ${path}`);

  await isDirectoryValid(path);

  const pathsToWrite = await readPaths();

  pathsToWrite.push(path);

  await openFile(PATHS_STORAGE_FILENAME, 'w')
    .then(async (fd) => {
      info(`Storing paths: ${pathsToWrite}`);
      await writeFile(fd, JSON.stringify(removeArrayDuplicates(pathsToWrite)));
    })
    .catch((e) => {
      error('Failed to write, with error: %O', e);
      throw new FailedAddition(`Could not open the file for writing ${e.toString()}`);
    });
}

/**
 * Calls all valid helpers to determine if a directory is valid for tracking
 *
 * @param {string} path Directory to check
 */
async function isDirectoryValid(path) {
  if (!(await directoryExists(path))) {
    throw new DirectoryNotFound(`Could not find directory - ${path}`);
  }

  if (!(await isDirectory(path))) {
    throw new DirectoryNotFound(`Provided path does not point to directory - ${path}`);
  }

  if (!(await isGitTracked(path))) {
    throw new Error(`Could not find git tracking for this directory - ${path}`);
  }

  if (isHidden(path)) {
    throw new Error(`Directory is hidden - ${path}`);
  }
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

/**
 * Determines if the path points to a directory
 *
 * @param {string} path The path to check
 */
function isDirectory(path) {
  return fileStats(path)
    .then((stats) => stats.isDirectory())
    .catch(() => 0);
}

/**
 * Returns whether the path is pointing to a hidden item or not
 *
 * @param {string} path The path to inspect
 */
function isHidden(path) {
  return path.substring(path.lastIndexOf('/') + 1).startsWith('.');
}

export default addPath;
