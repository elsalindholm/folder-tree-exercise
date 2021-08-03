import { NodeType } from '../state/AppState';
import { TreeNode } from './treeNode';

export class Folder extends TreeNode {
  public children: TreeNode[] = [];

  constructor(id: string, parentId: string, label: string) {
    super(NodeType.FOLDER, id, parentId, label);
  }
}
