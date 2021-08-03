import { observer } from 'mobx-react';
import React from 'react';
import { Document } from '../../model/Document';

interface DocumentProps {
  document: Document;
}

export const DocumentRow: React.FC<DocumentProps> = observer(({ document }) => {
  return (
    <div>
      <div> </div>
      <div>D</div>
      <div>{document.label}</div>
    </div>
  );
});
