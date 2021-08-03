import { action, observable } from 'mobx';
import { Folder } from '../model/Folder';
import { TreeNode } from '../model/treeNode';

export enum NodeType {
  FOLDER = 'folder',
  DOCUMENT = 'document',
}

export class AppState {
  public treeRoot = new Folder('', '', '');
  @observable public nodeMap = new Map<string, TreeNode>();

  constructor() {
    this.nodeMap.set(this.treeRoot.id, this.treeRoot);
  }

  @action createRootFolder() {
    const parentId = ''; // root folder parents have no id
    let folderId = this.createRandomId();
    const newRootFolder = new Folder(folderId, parentId, 'New Folder');

    const parent = this.nodeMap.get(parentId) as Folder;

    if (parent) {
      parent.children.push(newRootFolder);
      console.log(`${parent} is a parent of ${newRootFolder}`);
    }

    this.nodeMap.set(newRootFolder.id, newRootFolder);
    console.log(this.nodeMap);
  }

  @action createRandomId() {
    let charsForId = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let lengthOfId = 6;
    let randomId: string[] = [];

    for (let i = 0; i < lengthOfId; i++) {
      let index = Math.floor(Math.random() * (charsForId.length - 1));
      randomId.push(charsForId[index]);
    }
    console.log(randomId);
    return randomId.join('');
  }
}
