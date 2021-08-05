import { observer } from 'mobx-react';
import React from 'react';

import { AppState } from '../../state/AppState';

interface DocumentFocusAreaProps {
  appState: AppState;
}

@observer
export class DocumentFocusArea extends React.PureComponent<DocumentFocusAreaProps> {
  render() {
    const { appState } = this.props;

    return (
      <div className={'focus-area'}>
        <div className={'focus-buttons'}>
          <button>Delete Document</button>
        </div>
        <div className={'title-area'}>
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
        </div>
        <div>Document Content</div>
      </div>
    );
  }
}
