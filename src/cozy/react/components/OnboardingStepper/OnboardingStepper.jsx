import React, { useContext } from 'react'

import { useClient } from 'cozy-client'
import {
  Stepper,
  Step,
  StepButton,
  StepLabel
} from 'cozy-ui/transpiled/react/Stepper'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { BitwardenSettingsContext } from 'cozy/react/bitwarden-settings'
import { canAuthWithOIDC as canAuthWithOIDCFn } from 'cozy/react/helpers/oidc'
import { getStepsWithLabelAndRoute } from 'cozy/react/steps'

export const OnboardingStepper = ({ route, navigate }) => {
  const client = useClient()
  const { t } = useI18n()

  const bitwardenSettings = useContext(BitwardenSettingsContext)
  const isVaultConfigured =
    bitwardenSettings && bitwardenSettings.extension_installed

  const canAuthWithOIDC = canAuthWithOIDCFn(client)
  const canNavigateStepper = !canAuthWithOIDC || isVaultConfigured

  const steps = getStepsWithLabelAndRoute(t, canAuthWithOIDC)

  return (
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
  )
}