import React, { useState, useRef, useEffect } from "react";
import Notes from "../components/Notes";
import PlayButton from "../components/PlayButton";
import SettingsButton from "../components/SettingsButton";
import CountOff from "../components/CountOff";
import "./MusicBox.css";
import * as Tone from "tone";

import roots from "../libs/roots-lib";

// Audio samples
import audioSample from "../audio/woodblock.wav";

const notesArray = roots[0];

Tone.Buffer.on("load", function () {
  console.log("samples loaded, I think");
});

Tone.Transport.loop = true;

console.log("outside MusicBox");

export default function MusicBox(props) {
  const { bpm, toggleSettings, initialCountin, measureCount } = props;

  // Using this state I need to write a function to handle swipes
  const [metronome, setMetronome] = useState({
    currentNotes: ["Z", "X", notesArray[0], notesArray[1], notesArray[2]],
    positions: ["off-left", "prev", "current", "next", "off-right"],
  });

  const [currentBeat, setCurrentBeat] = useState({});

  // Used to render the correct media button
  const [isPlaying, setIsplaying] = useState(false);

  // Tone.Sampler
  const sampler = useRef(null);

  // Tone.Sequence
  const introSeq = useRef(null);
  const mainSeq = useRef(null);

  // Tone.Transport.schedule
  const noteEvent = useRef(null);
  const beatEvent = useRef(null);

  Tone.Transport.bpm.value = bpm;
  Tone.Transport.loopEnd = initialCountin + measureCount + "m";

  // Toggle will stop then start from beginning of transport
  const handleClick = () => {
    console.log(Tone.Transport.state);
    if (Tone.Transport.state === "started") {
      setCurrentBeat({});
    }
    setIsplaying(!isPlaying);
    Tone.Transport.toggle();
  };

  console.log("outside useEffect");

  // TODO: Figure out best way to implement this, with one or two useEffects.
  // TODO: Figure out if I should allow settings to be changed while playing, or lock while playing
  // Currently I'm using two useEffects and locking settings while metronome is playing
  useEffect(() => {
    console.log("Loading sample...");
    sampler.current = new Tone.Sampler({ C3: audioSample }).toMaster();
    return () => {
      sampler.current.dispose();
    };
  }, []);

  // Runs once on mount and then when dependencies change
  useEffect(() => {
    console.log("inside useEffect");

    // sampler.current = new Tone.Sampler({ C3: audioSample }).toMaster();

    introSeq.current = new Tone.Sequence(
      (time, note) => {
        sampler.current.triggerAttack(note, time);
      },
      ["C3", "C3", "C3", "C3"]
    );

    mainSeq.current = new Tone.Sequence(
      (time, note) => {
        sampler.current.triggerAttack(note, time);
      },
      ["E3", "D3", "D3", "D3"]
    );

    introSeq.current.start(0).stop(initialCountin + "m");
    mainSeq.current
      .start(initialCountin + "m")
      .stop(initialCountin + measureCount + "m");

    noteEvent.current = Tone.Transport.schedule(function (time) {
      // FIXME: Should this Tone method be inside setMetronome instead?
      // Intuitively I feel i should
      Tone.Draw.schedule(() => {
        // Using a setState to have react update and render the dom might not be
        // a precise way to trigger the animation. Might have to do it with a ref?
        // I'm pretty sure this is fine. The fixme above is more on my mind atm
        setMetronome((freshState) => {
          const notesCopy = [...freshState.currentNotes];

          // Track which element in currentNotes which currently has "next" class
          const nextClassIndex = freshState.positions.indexOf("next");
          const nextNote = notesCopy[nextClassIndex];
          // console.log(nextNote);

          // Use the above to find the nextNote in the roots-lib sequence
          let noteToInject;
          if (notesArray.indexOf(nextNote) === notesArray.length - 1) {
            noteToInject = notesArray[0];
          } else {
            noteToInject = notesArray[notesArray.indexOf(nextNote) + 1];
          }

          // Modify the notesCopy array to feed it the next note from the roots list
          // The note that corresponds with the "off-right" class will change, so this
          // line finds which one that is and changes it to the new note from the
          // roots-lib file
          notesCopy[freshState.positions.indexOf("off-right")] = noteToInject;

          // *Old slice style to copy arr, not cool like the destructuring above*
          // Next move the last element of the positions array to the front
          // The order these arrays are manipulated here is important
          const positionCopy = freshState.positions.slice();
          const popped = positionCopy.pop();
          positionCopy.unshift(popped);

          return {
            currentNotes: notesCopy,
            positions: positionCopy,
          };
        });
      }, time);
    }, Tone.Time(initialCountin + measureCount + "m") - 0.2);

    // I can't see a reason atm for this block to be in useEffect, at least not this one
    beatEvent.current = Tone.Transport.scheduleRepeat(function (time) {
      Tone.Draw.schedule(() => {
        const beatNum = parseInt(Tone.Transport.position.split(":")[1]) + 1;
        const bar = parseInt(Tone.Transport.position.split(":")[0]) + 1;
        const isCountInBeat = bar <= initialCountin;

        // TODO: Counoff needs to know if currentCount is countin or regular
        // setCurrentBeat({ beatNum: beatNum, isCountInBeat: isCountInBeat });
        setCurrentBeat({ beatNum, isCountInBeat });
      }, time);
    }, "4n");

    return () => {
      // sampler.current.dispose();
      introSeq.current.dispose();
      mainSeq.current.dispose();
      Tone.Transport.clear(noteEvent.current);
      Tone.Transport.clear(beatEvent.current);
    };
  }, [initialCountin, measureCount]);

  return (
    <div className="MusicBox">
      <CountOff currentBeat={currentBeat} />
      <Notes
        currentNotes={metronome.currentNotes}
        positions={metronome.positions}
      />
      <PlayButton isPlaying={isPlaying} handleClick={handleClick} />
      <SettingsButton isPlaying={isPlaying} toggleSettings={toggleSettings} />
    </div>
  );
}
