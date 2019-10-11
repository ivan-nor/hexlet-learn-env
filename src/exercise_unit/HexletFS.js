import path from 'path';
import Tree from '@hexlet/trees';

// BEGIN (write your solution here)
const getPathParts = (strPath) => {
  const normalizedPath = path.normalize(strPath);
  return normalizedPath.split(path.sep);
};
// END

export default class {
  constructor() {
    this.tree = new Tree('/', { type: 'dir' });
  }

  // BEGIN (write your solution here)
  isDirectory(dirPath) {
    // console.log(dirPath);
    const normalizedPath = getPathParts(dirPath);
    // console.log(normalizedPath);
    const node = this.getDeepChild(normalizedPath);
    const meta = node.getMeta();
    return meta.type === 'dir';
  }

  isFile(filePath) {
    console.log(filePath);
    const normalizedPath = getPathParts(filePath);
    console.log(normalizedPath);
    const node = this.getDeepChild(normalizedPath);
    const meta = node.getMeta();
    return meta.type === 'file';
  }

  mkdirSync(dirPath) {
    const normalizedPath = getPathParts(dirPath);
    const parsingPath = path.parse(normalizedPath);
    const node = this.getDeepChild(parsingPath.dir);
    if (!node) return false;
    return node.addChild(parsingPath.base, { type: 'dir' });
  }

  touchSync(filePath) {
    const normalizedPath = getPathParts(filePath);
    const parsingPath = path.parse(normalizedPath);
    const node = this.getDeepChild(parsingPath.dir);
    if (!node) return false;
    return node.addChild(parsingPath.base, { type: 'file' });
  }
  // END

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }
}
