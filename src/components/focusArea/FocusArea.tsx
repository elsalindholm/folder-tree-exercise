import { observer } from 'mobx-react';
import React from 'react';

import './focus-area.scss';

@observer
export class FocusArea extends React.PureComponent {
  render() {
    return <div className={'focus-area'}>Focus Area</div>;
  }
}
