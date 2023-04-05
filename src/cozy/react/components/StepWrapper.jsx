import React from 'react'

import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import { OnboardingStepper } from 'cozy/react/components/OnboardingStepper/OnboardingStepper';
import BackButton from 'cozy/react/components/BackButton'
import { STEPS } from 'cozy/react/steps'

const COZY_BAR_HEIGHT = 48

export const StepWrapper = ({ route, navigate, children }) => {
  const { isMobile } = useBreakpoints()

  const onClick = route === STEPS.PRESENTATION ? undefined : () => navigate({ route: '..' })

  return (
    <div style={{ marginTop: isMobile ? COZY_BAR_HEIGHT : 0 }}>
      { isMobile && (<BackButton onClick={onClick} />)}
      { !isMobile && (<OnboardingStepper route={route} navigate={navigate}/>)}
      { children }
    </div>
  )
}
