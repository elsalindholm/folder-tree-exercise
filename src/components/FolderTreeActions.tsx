import { observer } from 'mobx-react';
import React from 'react';

import './folder-tree-actions.scss';

@observer
export class FolderTreeActions extends React.PureComponent {
  render() {
    return (
      <div className={'folder-tree-actions'}>
        Folder Tree Actions
        <button className={'add-folder-button'}>+</button>
      </div>
    );
  }
}
