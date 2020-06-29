import React, { useRef } from "react";
import "./Notes.css";

export default function Notes(props) {
  // TODO: try using this to detect the swipe length and call goBack based on length
  const swipeLength = useRef(0);
  let tempLength = 0;
  const lastPosition = useRef(null);

  // I don't know if using refs here is the right approach or
  // if all I need are regular variables, this always seems to elude me
  // const lastPosition = { current: null };

  const swipeTrigger = (event) => {
    const currentPosition = event.changedTouches[0].clientX;

    if (lastPosition.current !== null) {
      const add = currentPosition - lastPosition.current;
      swipeLength.current += add;
      tempLength += add;
      console.log("ref: " + swipeLength.current);
      console.log("no-ref: " + tempLength);
      if (swipeLength.current > 100) {
        swipeLength.current = -1000;
        props.clickHandler();
      }
    }

    lastPosition.current = currentPosition;
  };

  const touchEnd = () => {
    swipeLength.current = 0;
    tempLength = 0;
    lastPosition.current = null;
  };

  return (
    <div
      onTouchMove={swipeTrigger}
      onTouchEnd={touchEnd}
      className="Notes"
      onClick={props.clickHandler}
    >
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
