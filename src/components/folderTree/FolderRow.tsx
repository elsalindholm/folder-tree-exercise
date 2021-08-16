import { observer } from 'mobx-react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

import { FolderNode } from '../../model/FolderNode';
import { ChevronSymbol } from '../../symbols/ChevronSymbol';
import { LineSymbol } from '../../symbols/LineSymbol';

import './folder-row.scss';

interface FolderProps {
  depth: number;
  folder: FolderNode;
  onSelect: () => void;
}

export const FolderRow: React.FC<FolderProps> = observer(({ depth, folder, onSelect }) => {
  let selectedFolder = folder.selected ? 'selected' : 'deselected';

  // for loop from 0 to depth, add spacers to array of JSX to render below
  let spacer: JSX.Element[] = [];

  for (let i = 0; i < depth; i++) {
    spacer.push(<div className={'folder-spacer'}></div>);
  }

  let folderSymbol: JSX.Element;
  if (folder.children.length > 0) {
    folderSymbol = folder.open ? <LineSymbol /> : <ChevronSymbol />;
  } else {
    folderSymbol = <div></div>;
  }

  return (
    <div className={'folder-row ' + selectedFolder} onClick={() => onSelect()}>
      {spacer}
      <div className={'folder-chevron'} onClick={() => folder.toggleFolderChildren()}>
        {folderSymbol}
      </div>
      <div className={'folder-icon'}>
        <FontAwesomeIcon icon={faFolder} />
      </div>
      <div className={'folder-label'}>{folder.label}</div>
    </div>
  );
});
