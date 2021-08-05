import { observer } from 'mobx-react';
import React from 'react';

import './folder-tree-actions.scss';

interface TreeActionProps {
  createRootFolder: () => void;
}

@observer
export class FolderTreeActions extends React.PureComponent<TreeActionProps> {
  render() {
    const { createRootFolder } = this.props;

    return (
      <div className={'folder-tree-actions'}>
        <div className={'app-title'}>Elsa's Folder Tree</div>
        <div className={'action-buttons-container'}>
          <label htmlFor={'folder-tree-search'}>Search</label>
          <input type={'text'} id={'folder-tree-search'} name={'folder-tree-search'}></input>
          <button className={'add-folder-button'} onClick={() => createRootFolder()}>
            +
          </button>
        </div>
      </div>
    );
  }
}
