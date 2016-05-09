import React from 'react'

import { createDevTools } from 'redux-devtools'
import DockMonitor from 'redux-devtools-dock-monitor'
import LogMonitor from 'redux-devtools-log-monitor'

const DevTools = createDevTools(
  <DockMonitor
    changePositionKey="ctrl-q"
    defaultIsVisible={false}
    toggleVisibilityKey="ctrl-h"
  >
    <LogMonitor />
  </DockMonitor>
)

export default DevTools
