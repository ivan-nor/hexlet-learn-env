import path from 'path';
import Tree from '@hexlet/trees';
import { Dir, File } from '@hexlet/fs';


const getPathParts = (filepath) => filepath.split(path.sep).filter((part) => part !== '');

export default class {
  constructor() {
    this.tree = new Tree('/', new Dir('/'));
  }

  statSync(filepath) {
    const current = this.findNode(filepath);
    if (!current) {
      return null;
    }
    return current.getMeta().getStats();
  }

  mkdirSync(filepath) {
    const current = this.findNode(filepath);
    if (current) {
      return false;
    }
    const { base, dir } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent || parent.getMeta().isFile()) {
      return false;
    }
    parent.addChild(base, new Dir(base));
    return true;
  }

  // BEGIN (write your solution here)
  readdirSync(filepath) {
    const { dir } = path.parse(filepath);
    const current = this.findNode(filepath);
    const parent = this.findNode(dir);
    // console.log(current);
    // const stats = this.statSync(filepath);
    // console.log(JSON.stringify(stats, null, 4));
    // console.log(stats.isDirectory());
    if (!current || !parent) {
      return false;
    }
    const children = current.getChildren();
    const mapped = children.map((child) => child.getKey());
    // console.log(mapped);
    return mapped;
  }

  mkdirpSync(filepath) {
    const listPaths = getPathParts(filepath);
    // console.log('LIST PATHS ', listPaths);
    const iter = (paths, dir) => {
      const [name, ...rest] = paths;
      // console.log('paths ', paths);
      // console.log('dir meta', dir.getMeta());
      // console.log('is file ', dir.meta.isFile());
      if (paths.length === 0 || dir.getMeta().isFile()) {
        return false;
      }
      if (rest.length === 0) {
        if (!dir.hasChild(name)) {
          return dir.addChild(name, new Dir(name));
        }
        return false;
      }
      if (!dir.hasChild(name)) {
        return iter(rest, dir.addChild(name, new Dir(name)));
      }
      return iter(rest, dir.getChild(name));
    };
    const result = iter(listPaths, this.tree);
    // console.log('result ', result);
    return result;
  }
  // END

  touchSync(filepath) {
    const { base, dir } = path.parse(filepath);
    const parent = this.findNode(dir);
    if (!parent) {
      return false;
    }
    if (parent.getMeta().isFile()) {
      return false;
    }
    parent.addChild(base, new File(base, ''));
    return true;
  }

  rmdirSync(filepath) {
    const { base } = path.parse(filepath);
    const current = this.findNode(filepath);
    if (!current) {
      return false;
    }
    if (current.getMeta().isFile() || current.hasChildren()) {
      return false;
    }
    current.getParent().removeChild(base);
    return true;
  }

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }
}
