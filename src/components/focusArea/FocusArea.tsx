import { observer } from 'mobx-react';
import React from 'react';

import { AppState, NodeType } from '../../state/AppState';
import { DocumentFocusArea } from './DocumentFocusArea';

import './focus-area.scss';
import { FolderFocusArea } from './FolderFocusArea';

interface FocusAreaProps {
  appState: AppState;
}

@observer
export class FocusArea extends React.PureComponent<FocusAreaProps> {
  render() {
    const { appState } = this.props;

    let focusAreaContent: JSX.Element;
    if (appState.selectedNode) {
      switch (appState.selectedNode.type) {
        case NodeType.FOLDER:
          focusAreaContent = <FolderFocusArea appState={appState} />;
          break;
        case NodeType.DOCUMENT:
          focusAreaContent = <DocumentFocusArea appState={appState} />;
          break;
      }
    } else {
      focusAreaContent = <div>Focus Area</div>;
    }

    return (
      <div className={'focus-area'}>
        <div>
          {focusAreaContent}
          <div></div>
        </div>
      </div>
    );
  }
}
