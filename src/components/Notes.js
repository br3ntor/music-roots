import React from 'react';
import './Notes.css';

export default function Notes(props) {
  return (
    <div className="Notes" onClick={props.handleClick}>
      <div className={`note ${props.positions[0]}`}>
        <Note letter={props.currentNotes[0]} />
      </div>
      <div className={`note ${props.positions[1]}`}>
        <Note letter={props.currentNotes[1]} />
      </div>
      <div className={`note ${props.positions[2]}`}>
        <Note letter={props.currentNotes[2]} />
      </div>
      <div className={`note ${props.positions[3]}`}>
        <Note letter={props.currentNotes[3]} />
      </div>
      <div className={`note ${props.positions[4]}`}>
        <Note letter={props.currentNotes[4]} />
      </div>
    </div>
  );
}

function Note(props) {
  if (props.letter.length > 1) {
    return (
      <span>
        {props.letter[0]}
        <sup>{props.letter[1]}</sup>
      </span>
    );
  }
  return <span>{props.letter}</span>;
}
