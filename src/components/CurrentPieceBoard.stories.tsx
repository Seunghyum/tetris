import * as React from 'react'

import { SHAPES } from '../utils/shapes'
import CurrentPieceBoard from './CurrentPieceBoard'

export default {
  title: 'Dashboard',
  parameters: {
    info: { inline: true },
  },
}

export const CurrentPieceboard = () => (
  <>
    {SHAPES.map(s => (
      <div style={{ display: 'inline-block' }}>
        <CurrentPieceBoard piece={s} />
      </div>
    ))}
    {/* {<CurrentPieceBoard piece={SHAPES[0]} />} */}
  </>
)
