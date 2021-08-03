import { observer } from 'mobx-react';
import React from 'react';

import { Folder } from '../../model/Folder';

import './folder-row.scss';

interface FolderProps {
  folder: Folder;
  onSelect: () => void;
}

export const FolderRow: React.FC<FolderProps> = observer(({ folder, onSelect }) => {
  let selectedFolder = folder.selected ? 'selected' : 'deselected';

  return (
    <div className={'folder-row ' + selectedFolder} onClick={() => onSelect()}>
      <div className={'folder-spacer'}></div>
      <div className={'folder-chevron'}>V</div>
      <div className={'folder-symbol'}>F</div>
      <div className={'folder-label'}>{folder.label}</div>
      <div className={'edit-folder-button'}>+</div>
    </div>
  );
});
