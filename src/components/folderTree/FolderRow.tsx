import { observer } from 'mobx-react';
import React from 'react';

import { Folder } from '../../model/Folder';

import './folder-row.scss';

interface FolderProps {
  depth: number;
  folder: Folder;
  onSelect: () => void;
}

export const FolderRow: React.FC<FolderProps> = observer(({ depth, folder, onSelect }) => {
  let selectedFolder = folder.selected ? 'selected' : 'deselected';

  // for loop from 0 to depth, add spacers to array of JSX to render below
  let spacer: JSX.Element[] = [];

  for (let i = 0; i < depth; i++) {
    spacer.push(<div className={'folder-spacer'}></div>);
  }

  return (
    <div className={'folder-row ' + selectedFolder} onClick={() => onSelect()}>
      {spacer}
      <div className={'folder-chevron'}>v</div>
      <div className={'folder-label'}>{folder.label}</div>
    </div>
  );
});
