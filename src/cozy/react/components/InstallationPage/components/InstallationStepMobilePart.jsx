import React from 'react'

import Stack from 'cozy-ui/transpiled/react/Stack'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { InstallNativeAppButton } from 'cozy/react/components/AvailablePlatforms'

const InstallationStepMobilePart = () => {
  const { t } = useI18n()

  return (
    <Stack spacing="m">
      <Typography variant="h3" component="h1">{t('InstallationStepMobile.title')}</Typography>
      <Typography variant="body1">{t('InstallationStepMobile.description')}</Typography>
      <InstallNativeAppButton
        label={t('InstallationStepMobile.installApp')}
        theme="primary"
      />
    </Stack>
  )
}

export default InstallationStepMobilePart
