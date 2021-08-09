import { action, observable } from 'mobx';

import { NodeType } from '../state/AppState';
import { TreeNode } from './treeNode';

export class FolderNode extends TreeNode {
  @observable public children: TreeNode[] = [];
  @observable public open: boolean = false;

  constructor(id: string, parentId: string, label: string) {
    super(NodeType.FOLDER, id, parentId, label);
  }

  @action public toggleFolderChildren() {
    this.open = this.open ? false : true;
  }
}
