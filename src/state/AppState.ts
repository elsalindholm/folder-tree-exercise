import { action, observable } from 'mobx';

import { DocumentNode } from '../model/DocumentNode';
import { FolderNode } from '../model/FolderNode';
import { StorageNode } from '../model/StorageNode';
import { TreeNode } from '../model/treeNode';

export enum NodeType {
  FOLDER = 'folder',
  DOCUMENT = 'document',
}

export class AppState {
  @observable public treeRoot = new FolderNode('', '', '');
  @observable public nodeMap = new Map<string, TreeNode>();
  @observable public selectedNode: TreeNode;

  constructor() {
    this.nodeMap.set(this.treeRoot.id, this.treeRoot);
    this.loadFolderTree();
  }

  @action createFolder(currentFolder?: FolderNode) {
    const parentId = currentFolder ? currentFolder.id : '';
    const parent = currentFolder ?? this.treeRoot;
    let folderId = this.createRandomId();

    //folder requires id, parentId and label
    const newFolder = new FolderNode(folderId, parentId, 'New Folder');
    newFolder.setParent(parent);

    this.addChild(newFolder, newFolder.parent);

    this.nodeMap.set(newFolder.id, newFolder);
    console.log(this.nodeMap);

    this.onNodeSelect(newFolder);
    this.saveData();
  }

  @action createDocument(parentFolder: TreeNode) {
    const parentId = parentFolder.id;
    let documentId = this.createRandomId();

    //document requires id, parentId and label
    const newDocument = new DocumentNode(documentId, parentId, 'New Document');
    newDocument.setParent(parentFolder as FolderNode);

    this.addChild(newDocument, newDocument.parent);

    this.nodeMap.set(newDocument.id, newDocument);

    this.onNodeSelect(newDocument);
    this.saveData();
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

  @action addChild(child: TreeNode, parent: FolderNode) {
    parent.open = true;
    parent.children.push(child);
    parent.sortChildren();
  }

  @action deleteNode(currentNode: TreeNode) {
    //need to delete item + all its children from nodeMap
    this.deleteChildren(currentNode);

    //need to delete item from its parent's child array
    let parentFolder = this.nodeMap.get(currentNode.parentId) as FolderNode;

    parentFolder.children = parentFolder.children.filter((child) => child.id !== currentNode.id);

    //clear selectedNode variable
    this.selectedNode = undefined;
    this.saveData();
  }

  deleteChildren(node: TreeNode) {
    this.nodeMap.delete(node.id);

    if (node.isFolder()) {
      node.children.forEach((child) => this.deleteChildren(child));
    }
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

  @action filterTree(input: string) {
    if (!input) {
      this.clearFilter();
      return;
    }

    const inputLowerCase = input.toLowerCase();

    this.nodeMap.forEach((node: TreeNode) => {
      node.show = node.label.toLowerCase().includes(inputLowerCase);
      if (node.show) {
        this.showAncestors(node);
      }
    });
  }

  @action public clearFilter() {
    this.nodeMap.forEach((node: TreeNode) => {
      node.show = true;
    });
  }

  //showancestor, takes a treenode, has to get parent, show and expand and call function again for parents parent
  @action public showAncestors(node: TreeNode) {
    if (node.parentId) {
      const parent = this.nodeMap.get(node.parentId) as FolderNode;
      parent.show = true;
      parent.open = true;
      this.showAncestors(parent);
    }
    return;
  }

  @action public saveData() {
    const storageNodes: string[] = [];

    this.nodeMap.forEach((node: TreeNode) => {
      if (node.id) {
        const sNode = node.makeStorageNode();
        const stringified = JSON.stringify(sNode);
        storageNodes.push(stringified);
      }
    });

    const stringifiedArr = JSON.stringify(storageNodes);
    console.log('set node str arr: ', stringifiedArr);

    window.localStorage.setItem('nodes', stringifiedArr);

    // In a different function on load:
  }

  @action public loadFolderTree() {
    // Retrieve stored nodes from local storage
    const strArr = window.localStorage.getItem('nodes');
    if (!strArr.length) {
      return;
    }

    const retrievedNodes: string[] = JSON.parse(strArr);
    console.log('sNodes', retrievedNodes);

    // Create storage nodes for each stored node
    const storageNodes: StorageNode[] = [];
    retrievedNodes.forEach((sNode: string) => {
      const actualNode: StorageNode = JSON.parse(sNode);
      console.log('actual Snode: ', actualNode);
      storageNodes.push(actualNode);
    });

    // Create real nodes from storage nodes
    storageNodes.forEach((node: StorageNode) => {
      if (node.type === NodeType.FOLDER) {
        const newFolder = new FolderNode(node.id, node.parentId, node.label);
        this.nodeMap.set(newFolder.id, newFolder);
      } else if (node.type === NodeType.DOCUMENT) {
        const newDocument = new DocumentNode(node.id, node.parentId, node.label);
        newDocument.setDocumentContent(node.content);
        this.nodeMap.set(newDocument.id, newDocument);
      }
    });

    // Assign parent/child refs to nodes
    this.nodeMap.forEach((node) => {
      if (!node.parentId) {
        const parent = this.treeRoot;
        node.setParent(parent);
        this.addChild(node as TreeNode, parent);
      } else {
        const parent = this.nodeMap.get(node.parentId) as FolderNode;
        node.setParent(parent);
        this.addChild(node as TreeNode, parent);
      }
    });
    this.saveData();
  }
}
