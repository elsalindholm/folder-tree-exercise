import { observable } from 'mobx';

import { NodeType } from '../state/AppState';
import { TreeNode } from './treeNode';

export class FolderNode extends TreeNode {
  @observable public children: TreeNode[] = [];

  constructor(id: string, parentId: string, label: string) {
    super(NodeType.FOLDER, id, parentId, label);
  }
}
