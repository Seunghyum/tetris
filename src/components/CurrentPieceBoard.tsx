import React from 'react'
import styled from 'styled-components'

import { COLOR } from '~utils/shapes'
interface Props {
  piece: number[][]
}

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

function CurrentPieceBoard(props: Props): React.ReactElement {
  const baseBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]
  const { piece = baseBoard } = props

  return (
    <BoardTable>
      <tbody>
        {baseBoard.map((row: number[], x: number) => (
          <tr key={`pieceboard-r${x}`}>
            {row.map((col: number, y: number) => {
              return (
                <td key={`pieceboard-r${x}-c${y}`}>
                  <BlockItem color={piece[x] && piece[x][y] !== 0 ? COLOR[piece[x][y]] : 'none'} />
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </BoardTable>
  )
}

export default CurrentPieceBoard
