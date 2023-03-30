import React from 'react'

import { isMobile } from 'cozy-device-helper'

import NarrowContent from 'cozy-ui/transpiled/react/NarrowContent'

import Wrapper from 'cozy/react/components/Wrapper'
import VerticallyCentered from 'cozy/react/components/VerticallyCentered'
import InstallationStepMobilePart from 'cozy/react/components/InstallationPage/components/InstallationStepMobilePart'
import InstallationStepWebPart from 'cozy/react/components/InstallationPage/components/InstallationStepWebPart'

const InstallationStep = ({ onExtensionInstalled, onSkipExtension }) => {
  const isNativeMobile = isMobile()

  return (
    <VerticallyCentered>
      <Wrapper>
        <NarrowContent>
          {isNativeMobile ? (
            <InstallationStepMobilePart />
          ) : (
            <InstallationStepWebPart 
              onExtensionInstalled={onExtensionInstalled}
              onSkipExtension={onSkipExtension}
            />
          )}
        </NarrowContent>
      </Wrapper>
    </VerticallyCentered>
  )
}

export default InstallationStep
