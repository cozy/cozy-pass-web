import React, { useContext } from 'react'

import { BitwardenSettingsContext } from '../../bitwarden-settings'
import { isMobile } from 'cozy-device-helper'
import { useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'


import {
    Stepper,
    Step,
    StepButton,
    StepLabel
  } from 'cozy-ui/transpiled/react/Stepper'
  import { canAuthWithOIDC as canAuthWithOIDCFn } from 'cozy/react/helpers/oidc'

  function getSteps(t, canAuthWithOIDC) {
    return [
      {
        label: t('Nav.presentation'),
        route: 'installation/presentation'
      },
      {
        label: canAuthWithOIDC ? t('InstallationStep.steps.choose-pass-password') : t('InstallationStep.steps.improve-password'),
        route: 'installation/security'
      },
      {
        label: t('InstallationStep.steps.leave-hint'),
        route: 'installation/hint'
      },
      {
        label: isMobile() ? t('InstallationStep.steps.install-app') : t('InstallationStep.steps.install-extension'),
        route: 'installation/installation'
      }
    ]
  }

export const OnboardingStepper = ({ route, navigate }) => {
  const client = useClient()
  const { t } = useI18n()

  const bitwardenSettings = useContext(BitwardenSettingsContext)
  const isVaultConfigured =
    bitwardenSettings && bitwardenSettings.extension_installed

  const canAuthWithOIDC = canAuthWithOIDCFn(client)
  const canNavigateStepper = !canAuthWithOIDC || isVaultConfigured

  const steps = getSteps(t, canAuthWithOIDC, isVaultConfigured)

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
