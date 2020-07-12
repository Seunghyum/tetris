import React, { useEffect } from 'react'
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
        {baseBoard.map((row, x) => (
          <tr key={`r${x}`}>
            {row.map((col: number, y: number) => {
              return (
                <td key={`r${x}-c${y}`}>
                  <BlockItem
                    color={piece[x] && piece[y] && piece[x][y] !== 0 ? COLOR[col] : 'none'}
                  />
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
