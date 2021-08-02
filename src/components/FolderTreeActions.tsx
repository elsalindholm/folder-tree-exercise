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
        Folder Tree Actions
        <button className={'add-folder-button'} onClick={() => createRootFolder()}>
          +
        </button>
      </div>
    );
  }
}
