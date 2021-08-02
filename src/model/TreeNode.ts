import { NodeType } from '../state/AppState';

export abstract class TreeNode {
  //id, parentId, label
  public id: string;
  public parentId: string;
  public label: string;
  public type: NodeType;

  constructor(type: NodeType, id: string, parentId: string, label: string) {
    this.type = type;
    this.id = id;
    this.parentId = parentId;
    this.label = label;
  }
}
