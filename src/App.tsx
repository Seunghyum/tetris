import React from 'react'
import styled from 'styled-components'

import ControlGuideBoard from '~components/ControlGuideBoard'
import GameBoard from '~components/GameBoard'

function App(): React.ReactElement {
  return (
    <>
      <h1 className="main-title">TETRIS</h1>
      <div className="grid">
        <div className="left-column">
          <GameBoard />
        </div>
        <div className="right-column">
          <ControlGuideBoard />
        </div>
      </div>
    </>
  )
}

export default App
