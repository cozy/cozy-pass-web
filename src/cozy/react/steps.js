import { isMobile } from 'cozy-device-helper'

export const STEPS = {
  PRESENTATION: 'installation/presentation',
  SECURITY: 'installation/security',
  HINT: 'installation/hint',
  INSTALLATION: 'installation/installation',
}

export const getStepsWithLabelAndRoute = (t, shouldCreatePassword) => {
  return [
    {
      label: t('Nav.presentation'),
      route: STEPS.PRESENTATION
    },
    {
      label: shouldCreatePassword ? t('InstallationStep.steps.choose-pass-password') : t('InstallationStep.steps.improve-password'),
      route: STEPS.SECURITY
    },
    {
      label: t('InstallationStep.steps.leave-hint'),
      route: STEPS.HINT
    },
    {
      label: isMobile() ? t('InstallationStep.steps.install-app') : t('InstallationStep.steps.install-extension'),
      route: STEPS.INSTALLATION
    }
  ]
}
