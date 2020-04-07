import React from 'react';
import './CountOff.css';

export default function CountOff({ currentBeat }) {
  function makeStyle(num) {
    const objectIsEmpty = Object.keys(currentBeat).length === 0 && currentBeat.constructor === Object;
    let style = '';
    let highlight = '';

    // Check for empty object on initial render
    if (objectIsEmpty) {
      style = 'NumBox';
    } else if (currentBeat.beatNum === num) {
      highlight = currentBeat.isCountInBeat ? 'highlight-count-off NumBox' : 'highlight NumBox';
    } else {
      style = 'NumBox';
    }

    // Highlight all borders when its time to play measure/bar
    if (!objectIsEmpty && !currentBeat.isCountInBeat) {
      style += ' play-along';
    }

    return highlight + style;
  }

  return (
    <div className="CountOff">
      <div className={makeStyle(1)}>
        <span>1</span>
      </div>
      <div className={makeStyle(2)}>
        <span>2</span>
      </div>
      <div className={makeStyle(3)}>
        <span>3</span>
      </div>
      <div className={makeStyle(4)}>
        <span>4</span>
      </div>
    </div>
  );
}
