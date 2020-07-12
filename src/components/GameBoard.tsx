import { List } from 'immutable'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { COLOR, COLS, KEY, ROWS, SHAPES } from '~utils/shapes'

import CurrentPieceBoard from './CurrentPieceBoard'

const BoardTable = styled.table`
  width: fit-content;
  border: solid 2px;
  border-collapse: collapse;
  border-spacing: 0px;
  td {
    padding: 0px;
  }
`
const BlockItem = styled.div`
  height: 30px;
  width: 30px;
  background-color: ${(props: { color: string }): string => props.color};
`

const PlayButton = styled.button`
  background-color: #4caf50;
  font-size: 16px;
  padding: 15px 30px;
  cursor: pointer;
`

const DashBoardColum = styled.div`
  width: fit-content;
  display: inline-block;
`

function Board(): ReactElement {
  const [grid, setGrid] = useState([])
  const [beforeGrid, setBeforeGrid] = useState([])
  const [currentPiece, setCurrentPiece] = useState([])
  const [currentPieceType, setCurrentPieceType] = useState(0)
  const [currentPiecePosition, setCurrentPiecePosition] = useState({ x: 0, y: 0 })
  const [gameState, setGameState] = useState(false)
  const [pauseGame, setPauseGame] = useState(false)
  const gridRef = useRef(null)
  const beforeGridRef = useRef(null)
  const pauseGameRef = useRef(null)
  const currentPieceRef = useRef(null)
  const currentPiecePositionRef = useRef(null)
  const currentPieceTypeRef = useRef(null)
  gridRef.current = grid
  beforeGridRef.current = beforeGrid
  pauseGameRef.current = pauseGame
  currentPieceRef.current = currentPiece
  currentPiecePositionRef.current = currentPiecePosition
  currentPieceTypeRef.current = currentPieceType

  const reset = () => {
    setGrid(initEmptyBoard())
    setBeforeGrid(initEmptyBoard())
  }
  const initEmptyBoard = (): number[][] => {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0))
  }

  const moves = (key: KEY, piecePosition: { x: number; y: number }): { x: number; y: number } => {
    if (key === KEY.LEFT) return { x: piecePosition.x - 1, y: piecePosition.y }
    else if (key === KEY.RIGHT) return { x: piecePosition.x + 1, y: piecePosition.y }
    else if (key === KEY.DOWN) return { x: piecePosition.x, y: piecePosition.y + 1 }
    else return piecePosition
  }

  const isInsideWalls = (x: number): boolean => {
    return x >= 0 && x < COLS
  }

  const isAboveFloor = (y: number): boolean => {
    return y <= ROWS
  }

  const isNotOccupied = (x: number, y: number): boolean => {
    return beforeGridRef.current[y] && beforeGridRef.current[y][x] === 0
  }

  const checkBlockValid = (piece: number[][], piecePosition: { x: number; y: number }) => {
    return piece.every((row, dy) => {
      return row.every((value: number, dx: number) => {
        if (value === 0) return true
        const x = piecePosition.x + dx
        const y = piecePosition.y + dy

        return isInsideWalls(x) && isAboveFloor(y) && isNotOccupied(x, y)
      })
    })
  }
  const randomizeTetrominoType = (noOfTypes: number): number => {
    return Math.floor(Math.random() * noOfTypes + 1)
  }

  const initPieceType = () => {
    return randomizeTetrominoType(SHAPES.length - 1)
  }

  const cloneArr = (items: any): any =>
    items.map((item: any): any => (Array.isArray(item) ? cloneArr(item) : item))

  const updateGrid = (props: {
    piece: number[][]
    position: { x: number; y: number }
    type: number
  }): number[][] => {
    const { piece, position, type } = props
    const tmpGrid = cloneArr(beforeGridRef.current)

    piece.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 0) return
        const dx = position.x + x
        const dy = position.y + y
        tmpGrid[dy][dx] = type
      })
    })

    // setGrid(tmpGrid)
    return tmpGrid
  }

  const start = () => {
    const type = initPieceType()
    setCurrentPiece(SHAPES[type])
    setCurrentPieceType(type)
    const updatedGrid = updateGrid({
      piece: SHAPES[type],
      position: currentPiecePosition,
      type,
    })
    setGrid(updatedGrid)
    setGameState(true)
  }

  const pause = () => {
    setPauseGame(true)
  }

  const rotatePiece = (piece: number[][], type: number): number[][] => {
    const result = Array.from({ length: piece.length }, () => Array(piece[0].length).fill(0))
    if (piece.length === 3) {
      const CORE = Math.floor(piece.length / 2)
      result[CORE][CORE] = type
      piece.forEach((row: number[], x: number) => {
        row.forEach((col: number, y: number) => {
          if (col !== 0) {
            result[y][piece.length - 1 - x] = type
          }
        })
      })
    }

    return result
  }

  const keydownEventFunc = (event: KeyboardEvent) => {
    // 이벤트 버블링을 막는다.
    event.preventDefault()
    if (pauseGameRef.current) return false
    if (!Object.values(KEY).includes(event.keyCode)) return false

    const position = moves(event.keyCode, currentPiecePositionRef.current) // 조각의 새 상태를 얻는다.
    if (event.keyCode === KEY.UP) {
      const rotatedPiece = rotatePiece(currentPieceRef.current, currentPieceTypeRef.current)
      setCurrentPiece(rotatedPiece)
    }
    const piece = currentPieceRef.current
    console.table('=====piece : ', piece)
    console.table('=====currentPieceRef.current : ', currentPieceRef.current)

    if (checkBlockValid(piece, position)) {
      console.log('=======')
      // 이동이 가능한 상태라면 조각을 이동한다.
      if (position) setCurrentPiecePosition(position)
      const updatedGrid = updateGrid({
        piece,
        position,
        type: currentPieceTypeRef.current,
      })
      setGrid(updatedGrid)
    }
  }

  useEffect(() => {
    reset()
    document.addEventListener('keydown', keydownEventFunc)

    return () => {
      document.removeEventListener('keydown', keydownEventFunc)
    }
  }, [])

  return (
    <>
      <DashBoardColum>
        <PlayButton type="submit" onClick={start}>
          {gameState ? 'Reset' : 'Play'}
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
      </DashBoardColum>
      <DashBoardColum>
        <CurrentPieceBoard piece={currentPiece} />
      </DashBoardColum>
      <button type="submit" onClick={pause} disabled={!gameState}>
        {!gameState && pauseGame ? 'Start' : 'Stop'}
      </button>
      <BoardTable>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={`r${rowIndex}`}>
              {row.map((col: number, colIndex: number) => (
                <td key={`r${rowIndex}-c${colIndex}`}>
                  <BlockItem color={COLOR[col]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </BoardTable>
    </>
  )
}
export default Board
