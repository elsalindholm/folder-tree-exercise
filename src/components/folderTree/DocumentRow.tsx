import { observer } from 'mobx-react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

import { DocumentNode } from '../../model/DocumentNode';

import './document-row.scss';

interface DocumentProps {
  depth: number;
  document: DocumentNode;
  onSelect: () => void;
}

export const DocumentRow: React.FC<DocumentProps> = observer(({ depth, document, onSelect }) => {
  let selectedDocument = document.selected ? 'selected' : 'deselected';

  let spacer: JSX.Element[] = [];

  for (let i = 0; i < depth; i++) {
    spacer.push(<div className={'document-spacer'}> </div>);
  }

  return (
    <div className={'document-row ' + selectedDocument} onClick={() => onSelect()}>
      {spacer}
      <div className={'document-chevron'}></div>
      <div className={'document-symbol'}>
        <FontAwesomeIcon icon={faFile} color={'pink'} />
      </div>
      <div className={'document-label'}>{document.label}</div>
    </div>
  );
});
