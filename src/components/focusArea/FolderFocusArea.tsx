import { observer } from 'mobx-react';
import React from 'react';

import { AppState } from '../../state/AppState';

interface FolderFocusAreaProps {
  appState: AppState;
}

@observer
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
        <button onClick={() => appState.createFolder(appState.selectedNode)}>Add Sub Folder</button>
        <button onClick={() => appState.createDocument(appState.selectedNode)}>Add Document</button>
        <button>Delete Folder</button>
      </div>
    );
  }
}
