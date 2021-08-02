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
          <FolderTreeActions />
        </div>
        <div className={'tree'}>
          <FolderTree />
        </div>
        <div className={'focus-actions'}></div>
        <div className={'focus'}>
          <FocusArea />
        </div>
      </div>
    );
  }
}
