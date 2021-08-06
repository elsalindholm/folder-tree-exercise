import { action, observable } from 'mobx';

import { NodeType } from '../state/AppState';
import { TreeNode } from './treeNode';

export class DocumentNode extends TreeNode {
  @observable public content: string = '';

  constructor(id: string, parentId: string, label: string) {
    super(NodeType.DOCUMENT, id, parentId, label);
  }

  @action public setDocumentContent(content: string) {
    this.content = content;
  }
}
