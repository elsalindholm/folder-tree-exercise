import { observer } from 'mobx-react';
import React from 'react';

import './folder-tree-actions.scss';

interface TreeActionProps {
  createRootFolder: () => void;
  searchFolderTree: (input: string) => void;
  saveData: () => void;
  clearData: () => void;
  enableSave: boolean;
}

@observer
export class FolderTreeActions extends React.PureComponent<TreeActionProps> {
  render() {
    const { createRootFolder, searchFolderTree, saveData, clearData, enableSave } = this.props;

    return (
      <div className={'folder-tree-actions'}>
        <div className={'app-title'}>Folder Tree</div>
        <div className={'action-buttons-container'}>
          <input
            type={'search'}
            id={'folder-tree-search'}
            name={'folder-tree-search'}
            placeholder={'Search...'}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              searchFolderTree(event.target.value)
            }
          ></input>
          <button className={'add-folder-button'} onClick={() => createRootFolder()}>
            +
          </button>
          <button className={'action-button'} onClick={() => saveData()} disabled={!enableSave}>
            Save
          </button>
          <button className={'action-button'} onClick={() => clearData()}>
            Clear
          </button>
        </div>
      </div>
    );
  }
}
