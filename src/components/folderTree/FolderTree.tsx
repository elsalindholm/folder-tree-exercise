import { observer } from 'mobx-react';
import React from 'react';

import { Document } from '../../model/Document';
import { Folder } from '../../model/Folder';
import { TreeNode } from '../../model/treeNode';
import { AppState, NodeType } from '../../state/AppState';
import { FolderRow } from './FolderRow';
import { DocumentRow } from './DocumentRow';

import './folder-tree.scss';

interface FolderTreeProps {
  appState: AppState;
}

@observer
export class FolderTree extends React.PureComponent<FolderTreeProps> {
  render() {
    const { appState } = this.props;

    return (
      <div className={'folder-tree'}>
        {appState.treeRoot.children.map((child) => this.renderNode(child))}
      </div>
    );
  }

  private renderNode(node: TreeNode) {
    const { appState } = this.props;

    if (node.isFolder()) {
      // Render our folder row
      return <FolderRow folder={node} key={node.id} onSelect={() => appState.onNodeSelect(node)} />;
    } else {
      // Render our doc row
    }
  }
}
