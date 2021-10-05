import './App.css';
import { useState } from 'react';
import Picker from './components/Picker';
import InfoPanel from './components/InfoPanel';


function App() {
  const [selectedSenator, setSelectedSenator] = useState(undefined)
  
  return (
    <div className="App">
      <Picker onSelect={(e) => setSelectedSenator(e.value)}/>
      <div>
        <InfoPanel senatorData={selectedSenator}/>
      </div>
    </div>
  );
}

export default App;
