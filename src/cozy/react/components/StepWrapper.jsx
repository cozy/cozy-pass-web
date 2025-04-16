import React from 'react'

import useBreakpoints from "cozy-ui/transpiled/react/providers/Breakpoints"

import { OnboardingStepper } from 'cozy/react/components/OnboardingStepper/OnboardingStepper';
import BackButton from 'cozy/react/components/BackButton'
import { STEPS } from 'cozy/react/steps'

const COZY_BAR_HEIGHT = 48

const ROUTES_WITHOUT_BACK_BUTTON = [STEPS.PRESENTATION, STEPS.INSTALLATION]

export const StepWrapper = ({ route, navigate, children }) => {
  const { isMobile } = useBreakpoints()

  const onClick = ROUTES_WITHOUT_BACK_BUTTON.includes(route) ? undefined : () => navigate({ goBack: true })

  return (
    <div style={{ marginTop: isMobile ? COZY_BAR_HEIGHT : 0 }}>
      { isMobile && (<BackButton onClick={onClick} />)}
      { !isMobile && (<OnboardingStepper route={route} navigate={navigate}/>)}
      { children }
    </div>
  )
}
