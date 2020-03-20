import React, {createContext} from 'react';
import logo from './logo.svg';
import './App.css';

const BatteryContext = createContext(100);
function App() {
  return (
    <BatteryContext.Provider value={100}>
      
    </BatteryContext.Provider>
  );
}

export default App;
