import { observer } from 'mobx-react';
import React from 'react';

import { TreeNode } from '../../model/treeNode';
import { AppState, NodeType } from '../../state/AppState';
import { FolderRow } from './FolderRow';

import './folder-tree.scss';
import { DocumentRow } from './DocumentRow';

interface FolderTreeProps {
  appState: AppState;
}

@observer
export class FolderTree extends React.PureComponent<FolderTreeProps> {
  render() {
    const { appState } = this.props;

    return (
      <div className={'folder-tree'}>
        {appState.treeRoot.children.map((child) => this.renderNode(child, 0))}
      </div>
    );
  }

  private renderNode(node: TreeNode, depth: number): JSX.Element {
    const { appState } = this.props;

    if (node.isFolder()) {
      // Render our folder row
      return (
        <>
          <FolderRow
            depth={depth}
            folder={node}
            key={node.id}
            onSelect={() => appState.onNodeSelect(node)}
          />
          {node.children.map((node) => this.renderNode(node, depth + 1))}
        </>
      );
    } else if (node.isDoc()) {
      return (
        <>
          <DocumentRow
            depth={depth}
            document={node}
            key={node.id}
            onSelect={() => appState.onNodeSelect(node)}
          />
        </>
      );
    } else {
      return null;
    }
  }
}
