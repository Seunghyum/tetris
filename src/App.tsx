import React from 'react'
import styled from 'styled-components'

import ControlGuideBoard from '~components/ControlGuideBoard'
import TetrisBoard from '~containers/TetrisBoard'

function App(): React.ReactElement {
  return (
    <>
      <h1 className="main-title">TETRIS</h1>
      <div className="grid">
        <div className="grid-column">
          <TetrisBoard />
        </div>
        <div className="grid-column">
          <ControlGuideBoard />
        </div>
      </div>
    </>
  )
}

export default App
