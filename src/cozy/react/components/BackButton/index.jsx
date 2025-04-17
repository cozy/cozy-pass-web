/* global cozy */

import React from 'react'

import { BarLeft } from 'cozy-bar'
import PreviousIcon from 'cozy-ui/transpiled/react/Icons/Previous'

const previousIconStyle = { width: '3em', padding: '1em', fill: 'var(--secondaryTextColor)' }

// Without onClick, BarLeft is empty and reset to default BarLeft
const BackButton = ({ onClick }) => (
  <BarLeft>
    { onClick && (<PreviousIcon style={previousIconStyle} onClick={onClick} />) }
  </BarLeft>
)

export default BackButton
