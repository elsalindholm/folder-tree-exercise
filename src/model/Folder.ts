import { observable } from 'mobx';

import { NodeType } from '../state/AppState';
import { TreeNode } from './treeNode';

export class Folder extends TreeNode {
  @observable public children: TreeNode[] = [];

  constructor(id: string, parentId: string, label: string) {
    super(NodeType.FOLDER, id, parentId, label);
  }
}
