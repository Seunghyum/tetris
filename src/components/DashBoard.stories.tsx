import * as React from 'react'

import DashBoard from './DashBoard'

export default {
  title: 'Dashboard',
  parameters: {
    info: { inline: true },
  },
}

export const Dashboard = () => (
  <>
    <DashBoard start={() => alert('start!')} gameState={true} />,
  </>
)
