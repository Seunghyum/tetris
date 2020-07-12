import React from 'react'
import styled from 'styled-components'

interface Props {
  piece: number[][]
  color: string
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
  const { color, piece = baseBoard } = props

  return (
    <BoardTable>
      <tbody>
        {baseBoard.map((row, x) => (
          <tr key={`r${x}`}>
            {row.map((col: number, y: number) => (
              <td key={`r${x}-c${y}`}>
                <BlockItem color={piece[x] && piece[y] && piece[x][y] !== 0 ? color : 'none'} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </BoardTable>
  )
}

export default CurrentPieceBoard
