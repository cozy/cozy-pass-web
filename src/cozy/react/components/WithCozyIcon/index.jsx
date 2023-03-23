import React from 'react'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { Media, Bd, Img } from 'cozy-ui/transpiled/react/Media'
import CloudIcon from 'cozy/react/components/CloudIcon'
import './styles.css'

const WithCozyIcon = props => {
  return (
    <Media className="u-inline-flex">
      <Img>
        <CloudIcon />
      </Img>
      <Bd className="u-ml-half">
      <Typography variant="h6" component="strong" {...props} className="WithCozyIcon__text" />
      </Bd>
    </Media>
  )
}

export default WithCozyIcon
