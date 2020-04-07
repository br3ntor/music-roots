import React, { useState } from "react";
import MusicBox from "./containers/MusicBox";
import Settings from "./containers/Settings";

// TODO: Should I move this to index.css?
import "./App.css";

export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [initialCountin, setInitialCountin] = useState(1);
  const [measureCount, setMeasureCount] = useState(1);

  const toggleSettings = () => setSettingsOpen(!settingsOpen);

  return (
    <div className="AppContainer">
      <MusicBox
        bpm={bpm}
        initialCountin={initialCountin}
        measureCount={measureCount}
        toggleSettings={toggleSettings}
      />
      {/* TODO: Decide what to do about this, leave it or refactor? */}
      {/* Instead of hiding and showing the Settings by passing
      in a bool like I am now, I could conditionally render the settings
      here based on that same boolean state variable. I'm really not sure
      what the pros and cons of each are hmmm... */}
      <Settings
        bpm={bpm}
        setBpm={setBpm}
        settingsOpen={settingsOpen}
        setInitialCountin={setInitialCountin}
        setMeasureCount={setMeasureCount}
        toggleSettings={toggleSettings}
      />
    </div>
  );
}
