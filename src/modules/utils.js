import nodePath from 'path';
import fs from 'fs';
import util from 'util';

/**
 * Method to filter using an async predicate
 *
 * @param {Function} predicate Function to determine membership to filter
 * @param {Array.<any>} list List to filter
 * @returns {Array.<any>} A filtered list
 */
function asyncFilter(predicate, list) {
  return list.reduce(
    async (acc, item) => acc.then(async (result) => {
      const isValid = await predicate(item);

      if (isValid) {
        result.push(item);
      }

      return result;
    }),
    Promise.resolve([]),
  );
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

/**
 * Removes duplicates from an array
 *
 * @param {Array.<any>} array Any array
 * @returns {Array.<any>} Any array without duplicates
 */
function removeArrayDuplicates(array) {
  return Array.from(new Set(array));
}

const openFile = util.promisify(fs.open);
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const accessFile = util.promisify(fs.access);
const fileStats = util.promisify(fs.stat);
const readDir = util.promisify(fs.readdir);

export {
  asyncFilter,
  convertToAbsolute,
  removeArrayDuplicates,
  openFile,
  writeFile,
  readFile,
  accessFile,
  fileStats,
  readDir,
};
