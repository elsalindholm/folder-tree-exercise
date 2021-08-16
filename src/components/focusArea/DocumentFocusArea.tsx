import { observer } from 'mobx-react';
import React from 'react';
import { DocumentNode } from '../../model/DocumentNode';
import { TreeNode } from '../../model/treeNode';

import { AppState } from '../../state/AppState';

import './document-focus-area.scss';

interface DocumentFocusAreaProps {
  appState: AppState;
}

@observer
export class DocumentFocusArea extends React.PureComponent<DocumentFocusAreaProps> {
  render() {
    const { appState } = this.props;

    const currentDocument = appState.selectedNode as DocumentNode;

    return (
      <div className={'focus-area'}>
        <div className={'focus-buttons'}>
          <button onClick={() => appState.deleteNode(appState.selectedNode)}>
            Delete Document
          </button>
        </div>
        <div className={'title-area'}>
          <label htmlFor={'document-title'}>Title:</label>
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

        <textarea
          id={'doc-text-area'}
          name={'doc-text-area'}
          value={currentDocument.content}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            currentDocument.setDocumentContent(event.target.value)
          }
        ></textarea>
      </div>
    );
  }
}
