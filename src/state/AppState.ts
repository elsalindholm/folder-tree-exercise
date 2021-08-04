import { action, observable } from 'mobx';
import { Folder } from '../model/Folder';
import { TreeNode } from '../model/treeNode';

export enum NodeType {
  FOLDER = 'folder',
  DOCUMENT = 'document',
}

export class AppState {
  @observable public treeRoot = new Folder('', '', '');
  @observable public nodeMap = new Map<string, TreeNode>();
  @observable public selectedNode: TreeNode;

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

  @action createSubFolder(currentFolder: TreeNode) {
    const parentId = currentFolder.id;
    let folderId = this.createRandomId();
    const newSubFolder = new Folder(folderId, parentId, 'New Folder');

    let parent = currentFolder as Folder;
    parent.children.push(newSubFolder);
    console.log(`${parent} now has a sub folder ${newSubFolder}`);

    this.nodeMap.set(newSubFolder.id, newSubFolder);
    console.log(this.nodeMap);
  }

  @action DeleteFolder(currentFolder: TreeNode) {
    //need to delete item + all its children from nodeMap
    //need to delete item from its parent's child array
    //need to make sure item no longer as the selected node, maybe above will already sort it?
  }

  @action createRandomId() {
    let charsForId = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let lengthOfId = 6;
    let randomId: string[] = [];

    for (let i = 0; i < lengthOfId; i++) {
      let index = Math.floor(Math.random() * (charsForId.length - 1));
      randomId.push(charsForId[index]);
    }
    console.log(randomId);
    return randomId.join('');
  }

  @action onNodeSelect(node: TreeNode) {
    //first deselect previously selected node
    if (this.selectedNode) {
      console.log(`old selected ${this.selectedNode.id}`);
      this.selectedNode.deselect();
    }
    //then set the new selected node
    this.selectedNode = node;
    this.selectedNode.select();
    console.log(`new selected ${this.selectedNode.id}`);
  }
}
