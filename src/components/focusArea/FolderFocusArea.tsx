import { observer } from 'mobx-react';
import React from 'react';
import { FolderNode } from '../../model/FolderNode';

import { AppState } from '../../state/AppState';

import './folder-focus-area.scss';

interface FolderFocusAreaProps {
  appState: AppState;
}

@observer
export class FolderFocusArea extends React.PureComponent<FolderFocusAreaProps> {
  render() {
    const { appState } = this.props;
    return (
      <div className={'focus-area'}>
        <div className={'focus-buttons'}>
          <button onClick={() => appState.createFolder(appState.selectedNode as FolderNode)}>
            Add Sub Folder
          </button>
          <button onClick={() => appState.createDocument(appState.selectedNode)}>
            Add Document
          </button>
          <button onClick={() => appState.deleteNode(appState.selectedNode)}>Delete Folder</button>
        </div>
        <div className={'title-area'}>
          <label htmlFor={'folder-title'}>Title:</label>
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
      </div>
    );
  }
}
