import { action, observable } from 'mobx';
import { Folder } from '../model/Folder';
import { TreeNode } from '../model/treeNode';

export enum NodeType {
  FOLDER = 'folder',
  DOCUMENT = 'document',
}

export class AppState {
  public treeRoot = new Folder('', '', '');
  @observable public treeNodes = new Map<string, TreeNode>();

  constructor() {
    this.treeNodes.set(this.treeRoot.id, this.treeRoot);
  }

  @action createRootFolder() {
    const parentId = ''; // root folder parents have no id
    const newRootFolder = new Folder('new', parentId, 'New Folder');

    const parent = this.treeNodes.get(parentId);

    this.treeNodes.set(newRootFolder.id, newRootFolder);
    console.log(this.treeNodes);
  }
}
