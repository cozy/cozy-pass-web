import React from 'react'

import Stack from 'cozy-ui/transpiled/react/Stack'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { InstallNativeAppButton } from 'cozy/react/components/AvailablePlatforms'
import mobileAppIcon from 'cozy/react/assets/mobile-app.svg'

const InstallationStepMobilePart = ({ isNativePassInstalledOnDevice }) => {
  const { t } = useI18n()
  
  return (
    <Stack spacing="xxl">
      <Stack spacing="m">
        <img src={mobileAppIcon} alt="" height={137} /> 
        <Typography variant="h3" component="h1" className="u-mt-1">
          {
            isNativePassInstalledOnDevice
              ? t('InstallationStepMobile.titleInstalled')
              : t('InstallationStepMobile.title')
          }
          </Typography>
        <Typography variant="body1">
          {
            isNativePassInstalledOnDevice
              ? t('InstallationStepMobile.descriptionInstalled')
              : t('InstallationStepMobile.description')
          }
        </Typography>
      </Stack>
      <InstallNativeAppButton
        label={          
          isNativePassInstalledOnDevice
            ? t('InstallationStepMobile.openApp')
            : t('InstallationStepMobile.installApp')
        }
        theme="primary"
      />
    </Stack>
  )
}

export default InstallationStepMobilePart
