import React from 'react';

import { BarComponent } from 'cozy-bar'
import useBreakpoints from "cozy-ui/transpiled/react/providers/Breakpoints"

import ReactWrapper, { reactWrapperProps } from '../react-wrapper';


const Bar = () => {
  const { isMobile } = useBreakpoints()

  return (
    // Add the height of the bar as margin in mobile
    <div style={{ marginTop: isMobile ? '3rem' : 0 }}>
      <BarComponent searchOptions={{ enabled: false }}/>
    </div>
  )
}

const BarWrapper = ({
  reactWrapperProps
}) => {  
  return (
    <div style={{ width: 0, height: 0 }}>
      <ReactWrapper reactWrapperProps={reactWrapperProps}>
        <Bar />
      </ReactWrapper>
    </div>
  );
};

BarWrapper.propTypes = {
  reactWrapperProps: reactWrapperProps.isRequired
}

export default BarWrapper;
