import React from 'react';

import { AppState } from '../../state/AppState';

interface FolderFocusAreaProps {
  appState: AppState;
}

export class FolderFocusArea extends React.PureComponent<FolderFocusAreaProps> {
  render() {
    const { appState } = this.props;
    return (
      <div>
        <label htmlFor={'folder-title'}>Folder Title:</label>
        <input
          type={'text'}
          id={'folder-title'}
          name={'folder-title'}
          value={appState.selectedNode.label}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            appState.selectedNode.setLabel(event.target.value)
          }
        ></input>
      </div>
    );
  }
}
