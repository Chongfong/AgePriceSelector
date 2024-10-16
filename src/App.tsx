import React from 'react';
import './App.css';
import AgeGroupPriceList from './components/AgeGroupPriceList';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <AgeGroupPriceList
          onChange={(result: { ageGroup: number[]; price: string }[]): void => console.log(result)}
        />
      </header>
    </div>
  );
}

export default App;
