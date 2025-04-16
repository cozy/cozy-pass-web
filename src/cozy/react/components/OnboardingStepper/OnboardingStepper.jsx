import React, { useContext } from 'react'

import { useClient } from 'cozy-client'
import {
  Stepper,
  Step,
  StepButton,
  StepLabel
} from 'cozy-ui/transpiled/react/Stepper'
import { useI18n } from "cozy-ui/transpiled/react/providers/I18n"

import Wrapper from 'cozy/react/components/Wrapper'
import { BitwardenSettingsContext } from 'cozy/react/bitwarden-settings'
import { useShouldCreatePassword } from 'cozy/react/components/InstallationPage/useShouldCreatePassword'
import { getStepsWithLabelAndRoute } from 'cozy/react/steps'

export const OnboardingStepper = ({ route, navigate }) => {
  const client = useClient()
  const { t } = useI18n()

  const {
    extension_installed: isVaultConfigured,
    hasHint
  } = useContext(BitwardenSettingsContext)
  const shouldCreatePassword = useShouldCreatePassword()

  if (shouldCreatePassword === undefined) {
    return null
  }

  const canNavigateStepper = !shouldCreatePassword || isVaultConfigured

  const steps = getStepsWithLabelAndRoute(t, shouldCreatePassword)

  return (
    <Wrapper>
      <Stepper
        alternativeLabel
        nonLinear={canNavigateStepper}
        activeStep={steps.findIndex(step => step.route === route)}
      >
        {steps.map(step => {
          const labelProps = {
            error:
              route === 'installation/hint' && isVaultConfigured && hasHint === false
          }
          return (
            <Step
              disabled
              key={step.route}
              onClick={canNavigateStepper ? () => navigate({ route: step.route }) : null}
            >
              <StepButton>
                <StepLabel {...labelProps}>{step.label}</StepLabel>
              </StepButton>
            </Step>
          )
        })}
      </Stepper>
    </Wrapper>
  )
}
