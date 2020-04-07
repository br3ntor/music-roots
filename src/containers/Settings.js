import React from 'react';
import SettingsButton from '../components/SettingsButton';
import './Settings.css';

// Returns an array of react elements, options for select input
function tempoOptions() {
  const options = [];
  const range = [40, 210];
  const inc = 10;

  for (let i = range[0]; i <= range[1]; i += inc) {
    options.push(
      <option key={`bpm` + i} value={i}>
        {i}
      </option>
    );
  }
  return options;
}

// I might want to replace toggleSettings with setSettingsOpen(!settingsOpen)
export default function Settings(props) {
  const { bpm, setBpm, settingsOpen, toggleSettings, setInitialCountin, setMeasureCount } = props;

  return (
    <div className="Settings" style={settingsOpen ? { display: 'flex' } : { display: 'none' }}>
      <div className="SettingContainer">
        <label htmlFor="bpm">Tempo</label>
        <select defaultValue={bpm} onChange={(event) => setBpm(event.target.value)}>
          {tempoOptions()}
        </select>
      </div>
      <div className="SettingContainer">
        <label>Countoff</label>
        <select defaultValue="1" onChange={(event) => setInitialCountin(parseInt(event.target.value))}>
          <option value="1">1 Bar</option>
          <option value="2">2 Bar</option>
          <option value="3">3 Bar</option>
          <option value="4">4 Bar</option>
        </select>
      </div>
      <div className="SettingContainer">
        <label>PlayCount</label>
        <select defaultValue="1" onChange={(event) => setMeasureCount(parseInt(event.target.value))}>
          <option value="1">1 Bar</option>
          <option value="2">2 Bar</option>
          <option value="3">3 Bar</option>
          <option value="4">4 Bar</option>
        </select>
      </div>
      <SettingsButton toggleSettings={toggleSettings} settingsOpen />
    </div>
  );
}
