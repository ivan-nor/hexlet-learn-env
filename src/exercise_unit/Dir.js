/* eslint-disable class-methods-use-this */

import Node from './Node';

// BEGIN (write your solution here)
export default class extends Node {
  isDirectory() {
    return true;
  }

  isFile() {
    return false;
  }
}
// END
