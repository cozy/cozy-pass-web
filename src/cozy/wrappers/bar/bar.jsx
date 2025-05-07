import React from 'react';

import { BarComponent } from 'cozy-bar'
import useBreakpoints from "cozy-ui/transpiled/react/providers/Breakpoints"
import { WebviewIntentProvider } from "cozy-intent";

import ReactWrapper, { reactWrapperProps } from '../react-wrapper';

import { useWebviewIntentProxy } from '../react-webview-intent-proxy'; 

const Bar = () => {
  useWebviewIntentProxy();

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
      <WebviewIntentProvider>
        <ReactWrapper reactWrapperProps={reactWrapperProps}>
          <Bar />
        </ReactWrapper>
      </WebviewIntentProvider>
    </div>
  );
};

BarWrapper.propTypes = {
  reactWrapperProps: reactWrapperProps.isRequired
}

export default BarWrapper;
