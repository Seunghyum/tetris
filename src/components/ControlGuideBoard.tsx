import React from 'react'

function ControlGuideBoard(): React.ReactElement {
  return (
    <table className="control-guide-board">
      <tbody>
        <tr>
          <td>
            <i className="fas fa-arrow-up" />
          </td>
          <td>Rotate</td>
        </tr>
        <tr>
          <td>
            <i className="fas fa-arrow-left" />
            &nbsp;
            <i className="fas fa-arrow-down" />
            &nbsp;
            <i className="fas fa-arrow-right" />
          </td>
          <td>Move</td>
        </tr>
        <tr>
          <td>
            <b>A</b>
          </td>
          <td>Drop</td>
        </tr>
        <tr>
          <td>
            <b>P</b>
          </td>
          <td>Pause</td>
        </tr>
        <tr>
          <td>
            <b>N</b>
          </td>

          <td>New Game</td>
        </tr>
      </tbody>
    </table>
  )
}
export default ControlGuideBoard
