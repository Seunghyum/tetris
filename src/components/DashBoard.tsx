import React, { ReactElement } from 'react'
import styled from 'styled-components'

const PlayButton = styled.button`
  background-color: #4caf50;
  font-size: 16px;
  padding: 15px 30px;
  cursor: pointer;
`

export enum GameState {
  Reset = 'Reset',
  Play = 'Play',
}

interface DashBoardProps {
  start: () => void
  gameState: boolean
}

function DashBoard(props: DashBoardProps): ReactElement {
  const { start, gameState } = props

  return (
    <>
      <PlayButton type="submit" onClick={start}>
        {gameState ? GameState.Reset : GameState.Play}
      </PlayButton>
      <p>
        Score:
        <span id="score">0</span>
      </p>
      <p>
        Lines:
        <span id="lines">0</span>
      </p>
      <p>
        Level:
        <span id="level">0</span>
      </p>
    </>
  )
}

export default DashBoard
