import React from 'react';

import { AppState } from '../../state/AppState';

interface DocumentFocusAreaProps {
  appState: AppState;
}

export class DocumentFocusArea extends React.PureComponent<DocumentFocusAreaProps> {
  render() {
    const { appState } = this.props;

    return (
      <div>
        <div>
          <label htmlFor={'document-title'}>Document Title:</label>
          <input
            type={'text'}
            id={'document-title'}
            name={'document-title'}
            value={appState.selectedNode.label}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              appState.selectedNode.setLabel(event.target.value)
            }
          ></input>
          <button>Delete Document</button>
        </div>
        <div>Document Content</div>
      </div>
    );
  }
}
