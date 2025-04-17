import React, { useState, useCallback } from 'react'
import keyBy from 'lodash/keyBy'

import Button from "cozy-ui/transpiled/react/Buttons"
import getSupportedPlatforms, { platforms } from 'cozy/react/supportedPlatforms'
import Stack from 'cozy-ui/transpiled/react/Stack'
import { useI18n } from "cozy-ui/transpiled/react/providers/I18n"
import Card from 'cozy-ui/transpiled/react/Card'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'

import { isAndroid, isIOS } from 'cozy-device-helper'

import { AppStoreButton, PlayStoreButton } from './StoreButtons'
import browserIcons from './browserIcons'

const storeLinksPerOS = keyBy(
  Object.values(platforms).filter(x => x.os),
  'os'
)

export const InstallNativeAppButton = props => {
  const [isSmartphoneModalOpened, setSmartphoneModalOpened] = useState(false)
  const mobileOS = isAndroid() ? 'android' : isIOS() ? 'ios' : null
  const handleOpenModal = useCallback(() => {
    setSmartphoneModalOpened(true)
  }, [setSmartphoneModalOpened])

  const handleDismissModal = useCallback(() => {
    setSmartphoneModalOpened(false)
  }, [setSmartphoneModalOpened])

  const onClick = async () => {    
    if(mobileOS === null) {
      handleOpenModal()
    } else {
      await props.onClick?.()
      window.location.href = storeLinksPerOS[mobileOS].storeUrl
    }
  }

  return (
    <>
      <Button
        variant="secondary"
        className="u-mb-half u-w-100"
        {...props}
        onClick={onClick}
      />
      {isSmartphoneModalOpened ? (
        <Dialog
          open={isSmartphoneModalOpened}
          onClose={handleDismissModal}
          content={
            <div className="u-flex u-flex-column u-flex-justify-center">
              <div className="u-ta-center">
                <AppStoreButton href={storeLinksPerOS.ios.storeUrl} />
                <PlayStoreButton href={storeLinksPerOS.android.storeUrl} />
              </div>
            </div>
          }
        />
      ) : null}
    </>
  )
}

const AvailablePlatforms = props => {
  const { t } = useI18n()
  const supportedPlatforms = getSupportedPlatforms()
  return (
    <Card {...props}>
      <Stack spacing="m">
        <Typography variant="body1">{t('AvailablePlatforms.text')}</Typography>
        <div>
          {Object.entries(supportedPlatforms)
            .filter(([, infos]) => infos.type === 'browser')
            .map(([platform, infos]) => (
              <PlatformButton
                key={platform}
                href={infos.storeUrl}
                icon={browserIcons[platform]}
                label={infos.label}
              />
            ))}
          <InstallNativeAppButton label={t('AvailablePlatforms.smartphone')} />
        </div>
      </Stack>
    </Card>
  )
}

export default AvailablePlatforms
