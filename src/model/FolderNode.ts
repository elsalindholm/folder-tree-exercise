import { action, observable } from 'mobx';

import { NodeType } from '../state/AppState';
import { StorageNode } from './StorageNode';
import { TreeNode } from './treeNode';

export class FolderNode extends TreeNode {
  @observable public children: TreeNode[] = [];
  @observable public childrenIds: string[] = [];
  @observable public open: boolean = false;

  constructor(id: string, parentId: string, label: string) {
    super(NodeType.FOLDER, id, parentId, label);
  }

  @action public toggleFolderChildren() {
    this.open = this.open ? false : true;
  }

  @action public sortChildren() {
    this.children = this.children.slice().sort((a, b) => a.label.localeCompare(b.label));
  }

  public makeStorageNode() {
    const sNode: StorageNode = {
      id: this.id,
      type: this.type,
      label: this.label,
      parentId: this.parentId,
      childrenIds: this.children.map((child) => child.id),
    };
    return sNode;
  }
}
