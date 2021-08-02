import { NodeType } from '../state/AppState';
import { TreeNode } from './treeNode';

export class Document extends TreeNode {
  constructor(id: string, parentId: string, label: string) {
    super(NodeType.DOCUMENT, id, parentId, label);
  }
}
