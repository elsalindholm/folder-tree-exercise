import { action, observable } from 'mobx';
import { AppState, NodeType } from '../state/AppState';
import { DocumentNode } from './DocumentNode';
import { FolderNode } from './FolderNode';
import { StorageNode } from './StorageNode';

export abstract class TreeNode {
  //id, parentId, label
  public id: string;
  @observable public parentId: string;
  @observable public parent?: FolderNode;
  @observable public label: string;
  public type: NodeType;
  @observable public selected: boolean = false;
  @observable public show: boolean = true;

  constructor(type: NodeType, id: string, parentId: string, label: string) {
    this.type = type;
    this.id = id;
    this.parentId = parentId;

    this.label = label;
  }

  @action public setParent(parent: FolderNode) {
    this.parent = parent;
  }

  @action public setLabel(newLabel: string) {
    this.label = newLabel;
    this.parent?.sortChildren();
  }

  public select() {
    this.selected = true;
  }

  public deselect() {
    this.selected = false;
  }

  public isFolder(): this is FolderNode {
    return this.type === NodeType.FOLDER;
  }

  public isDoc(): this is DocumentNode {
    return this.type === NodeType.DOCUMENT;
  }

  public abstract makeStorageNode(): StorageNode;
}
