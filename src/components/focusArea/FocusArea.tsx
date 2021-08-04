import { observer } from 'mobx-react';
import React from 'react';

import { TreeNode } from '../../model/treeNode';
import { AppState, NodeType } from '../../state/AppState';

import './focus-area.scss';
import { FolderFocusArea } from './FolderFocusArea';

interface FocusAreaProps {
  appState: AppState;
}

@observer
export class FocusArea extends React.PureComponent<FocusAreaProps> {
  render() {
    const { appState } = this.props;

    let folderTitle: JSX.Element;
    if (appState.selectedNode) {
      switch (appState.selectedNode.type) {
        case NodeType.FOLDER:
          folderTitle = <FolderFocusArea appState={appState} />;
          break;
      }
    } else {
      folderTitle = <div>Focus Area</div>;
    }

    return (
      <div className={'focus-area'}>
        <div>
          {folderTitle}
          <div></div>
        </div>
      </div>
    );
  }
}
