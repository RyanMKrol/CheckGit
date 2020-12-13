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

const openFile = util.promisify(fs.open);
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const accessFile = util.promisify(fs.access);

export {
  convertToAbsolute, openFile, writeFile, readFile, accessFile,
};
