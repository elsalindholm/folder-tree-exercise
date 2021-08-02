import { observer } from 'mobx-react';
import React from 'react';

import './folder-tree.scss';

@observer
export class FolderTree extends React.PureComponent {
  render() {
    return <div className={'folder-tree'}>Folder Tree</div>;
  }
}
