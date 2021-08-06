import { observer } from 'mobx-react';
import React from 'react';

import { TreeNode } from '../../model/treeNode';
import { AppState } from '../../state/AppState';
import { FolderRow } from './FolderRow';
import { DocumentRow } from './DocumentRow';
import { DocumentNode } from '../../model/DocumentNode';

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
        {appState.treeRoot.children.map((child) => this.renderNode(child, 0))}
      </div>
    );
  }

  private renderNode(node: TreeNode, depth: number): JSX.Element {
    const { appState } = this.props;

    if (node.isFolder()) {
      // Render our folder row
      return (
        <React.Fragment key={'frag-' + node.id}>
          <FolderRow depth={depth} folder={node} onSelect={() => appState.onNodeSelect(node)} />
          {node.children.map((node) => this.renderNode(node, depth + 1))}
        </React.Fragment>
      );
    } else if (node.isDoc()) {
      return (
        <React.Fragment key={node.id}>
          <DocumentRow depth={depth} document={node} onSelect={() => appState.onNodeSelect(node)} />
        </React.Fragment>
      );
    }

    return null;
  }
}
