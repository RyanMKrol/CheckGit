import nodePath from 'path';
import fs from 'fs';
import util from 'util';

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
  convertToAbsolute,
  removeArrayDuplicates,
  openFile,
  writeFile,
  readFile,
  accessFile,
  fileStats,
  readDir,
};
