import { action, observable } from 'mobx';

import { DocumentNode } from '../model/DocumentNode';
import { FolderNode } from '../model/FolderNode';
import { TreeNode } from '../model/treeNode';

export enum NodeType {
  FOLDER = 'folder',
  DOCUMENT = 'document',
}

export class AppState {
  @observable public treeRoot = new FolderNode('', '', '');
  public nodeMap = new Map<string, TreeNode>();
  @observable public selectedNode: TreeNode;

  constructor() {
    this.nodeMap.set(this.treeRoot.id, this.treeRoot);
  }

  @action createFolder(currentFolder?: TreeNode) {
    const parentId = currentFolder ? currentFolder.id : '';
    let folderId = this.createRandomId();

    //folder requires id, parentId and label
    const newFolder = new FolderNode(folderId, parentId, 'New Folder');

    const parent = this.nodeMap.get(parentId) as FolderNode;
    parent.open = true;

    if (parent) {
      parent.children.push(newFolder);
    }

    this.nodeMap.set(newFolder.id, newFolder);
    console.log(this.nodeMap);

    this.onNodeSelect(newFolder);
  }

  @action createDocument(parentFolder: TreeNode) {
    const parentId = parentFolder.id;
    let documentId = this.createRandomId();

    //document requires id, parentId and label
    const newDocument = new DocumentNode(documentId, parentId, 'New Document');

    const parent = this.nodeMap.get(parentId) as FolderNode;
    parent.open = true;
    parent.children.push(newDocument);

    this.nodeMap.set(newDocument.id, newDocument);

    this.onNodeSelect(newDocument);
  }

  @action deleteNode(currentNode: TreeNode) {
    //need to delete item + all its children from nodeMap
    this.deleteChildren(currentNode);

    //need to delete item from its parent's child array
    let parentFolder = this.nodeMap.get(currentNode.parentId) as FolderNode;

    parentFolder.children = parentFolder.children.filter((child) => child.id !== currentNode.id);

    //clear selectedNode variable
    this.selectedNode = undefined;
  }

  deleteChildren(node: TreeNode) {
    this.nodeMap.delete(node.id);

    if (node.isFolder()) {
      node.children.forEach((child) => this.deleteChildren(child));
    }
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
