import { observer } from 'mobx-react';
import React from 'react';

import { Document } from '../../model/Document';

import './document-row.scss';

interface DocumentProps {
  depth: number;
  document: Document;
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
      <div className={'document-symbol'}>D</div>
      <div className={'document-label'}>{document.label}</div>
    </div>
  );
});
