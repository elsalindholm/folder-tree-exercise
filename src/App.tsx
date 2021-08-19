import { observer } from 'mobx-react';
import React from 'react';

import { AppState } from './state/AppState';
import { FocusArea } from './components/focusArea/FocusArea';
import { FolderTree } from './components/folderTree/FolderTree';
import { FolderTreeActions } from './components/FolderTreeActions';

@observer
export class App extends React.PureComponent {
  private readonly appState = new AppState();
  public render() {
    return (
      <div className={'app'}>
        <div className={'tree-actions'}>
          <FolderTreeActions
            createRootFolder={() => this.appState.createFolder()}
            searchFolderTree={(input: string) => this.appState.filterTree(input)}
            saveData={() => this.appState.saveData()}
            clearData={() => this.appState.clearData()}
            enableSave={this.appState.unsavedChanges ? true : false}
          />
        </div>
        <div className={'tree'}>
          <FolderTree appState={this.appState} />
        </div>
        <div className={'focus-actions'}></div>
        <div className={'focus'}>
          <FocusArea appState={this.appState} />
        </div>
      </div>
    );
  }
}
