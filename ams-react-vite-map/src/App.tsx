import { useState } from 'react'
import './App.css'
import SVGMapComponent from './components/map';

function App() {

  return (
    <>
      <h1>ABPA Directors</h1>
      <div className='map-container'>
        <SVGMapComponent style={{ width: '100%', height: '100%' }}/>
      </div>
    </>
  )
}

export default App
