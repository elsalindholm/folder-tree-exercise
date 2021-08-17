import { action, observable } from 'mobx';

import { NodeType } from '../state/AppState';
import { StorageNode } from './StorageNode';
import { TreeNode } from './treeNode';

export class DocumentNode extends TreeNode {
  @observable public content: string = '';

  constructor(id: string, parentId: string, label: string) {
    super(NodeType.DOCUMENT, id, parentId, label);
  }

  @action public setDocumentContent(content: string) {
    this.content = content;
  }

  public makeStorageNode() {
    const sNode: StorageNode = {
      id: this.id,
      type: this.type,
      label: this.label,
      parentId: this.parentId,
      content: this.content,
    };
    return sNode;
  }
}
