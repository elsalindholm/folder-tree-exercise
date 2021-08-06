import { observable } from 'mobx';
import { NodeType } from '../state/AppState';
import { DocumentNode } from './Document';
import { FolderNode } from './Folder';

export abstract class TreeNode {
  //id, parentId, label
  public id: string;
  public parentId: string;
  @observable public label: string;
  public type: NodeType;
  @observable public selected: boolean;

  constructor(type: NodeType, id: string, parentId: string, label: string) {
    this.type = type;
    this.id = id;
    this.parentId = parentId;
    this.label = label;
    this.selected = false;
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

  public setLabel(newLabel: string) {
    this.label = newLabel;
  }
}
