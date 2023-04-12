import React from 'react'

import { useClient, Q } from 'cozy-client'
import Stack from 'cozy-ui/transpiled/react/Stack'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { InstallNativeAppButton } from 'cozy/react/components/AvailablePlatforms'
import useIsNativePassInstalledOnDevice from 'cozy/react/components/InstallationPage/useIsNativePassInstalledOnDevice'
import mobileAppIcon from 'cozy/react/assets/mobile-app.svg'

const InstallationStepMobilePart = () => {
  const { t } = useI18n()
  const client = useClient()

  const isNativePassInstalledOnDevice = useIsNativePassInstalledOnDevice()

  const setVaultInstalled = async () => {
    const { data } = await client.query(
      Q('io.cozy.settings').getById('io.cozy.settings.bitwarden'),
      { as: 'io.cozy.settings/io.cozy.settings.bitwarden' }  
    )
    const newInstanceSettings = {
      ...data,
      extension_installed: true
    }
    await client.save(newInstanceSettings)
  }

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
        onClick={setVaultInstalled}
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
