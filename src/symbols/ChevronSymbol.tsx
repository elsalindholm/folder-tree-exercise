import React from 'react';

export class ChevronSymbol extends React.PureComponent {
  render() {
    return (
      <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'>
        <g id='Chevron' transform='translate(-184 -1492)'>
          <path
            id='Path_1'
            data-name='Path 1'
            d='M0,0H20V20H0Z'
            transform='translate(184 1492)'
            fill='none'
          />
          <line
            id='Line_1'
            data-name='Line 1'
            y2='10'
            transform='translate(201.071 1498.464) rotate(45)'
            fill='none'
            stroke='#daddd8'
            stroke-width='1'
          />
          <path
            id='Path_2'
            data-name='Path 2'
            d='M0,0V9'
            transform='translate(187.636 1498.464) rotate(-45)'
            fill='none'
            stroke='#daddd8'
            stroke-width='1'
          />
        </g>
      </svg>
    );
  }
}
