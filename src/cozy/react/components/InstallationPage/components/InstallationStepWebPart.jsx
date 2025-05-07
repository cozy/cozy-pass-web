import React, { useEffect, useState } from 'react'
import snarkdown from 'snarkdown'

import { detect as detectBrowser } from 'detect-browser'

import Stack from 'cozy-ui/transpiled/react/Stack'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Card from 'cozy-ui/transpiled/react/Card'
import Button from "cozy-ui/transpiled/react/Buttons"
import { OrderedList, ListItem } from 'cozy-ui/transpiled/react/OrderedList'
import { useI18n } from "cozy-ui/transpiled/react/providers/I18n"

import { useClient } from 'cozy-client'

import browserExtensionIcon from 'cozy/react/assets/browser-extension.svg'

import WithCozyIcon from 'cozy/react/components/WithCozyIcon'

import { useExtensionStatus, extensionStatuses } from 'cozy/react/helpers/extensionStatus'
import { canAuthWithOIDC } from 'cozy/react/helpers/loginType'

import getSupportedPlatforms from 'cozy/react/supportedPlatforms'

const browser = detectBrowser()

const InstallationStepWebPart = ({ onExtensionInstalled, onSkipExtension }) => {
  const client = useClient()
  const { t } = useI18n()
  const [storeVisited, setStoreVisited] = useState(false)

  const cozyURL = new URL(client.getStackClient().uri)

  const supportedPlatforms = getSupportedPlatforms()
  const platform = supportedPlatforms[browser.name] || {}
  const storeURL = platform.storeUrl

  const extensionStatus = useExtensionStatus()
  useEffect(() => {
    if (extensionStatus == extensionStatuses.installed) {
      onExtensionInstalled && onExtensionInstalled()
    }
  }, [extensionStatus, onExtensionInstalled])

  const onGoToStore = () => {
    setStoreVisited(true)
  }

  return (
    <Stack spacing="xxl">
      <Stack spacing="m">
        <img
          src={browserExtensionIcon}
          alt=""
          height={115}
        />
        <Typography variant="h3" component="h1" className="u-mt-1">{t('InstallationStep.title')}</Typography>
        <Typography variant="body1">
          <span
            dangerouslySetInnerHTML={{
              __html: snarkdown(
                t('InstallationStep.description')
              )
            }}
          />
        </Typography>
      </Stack>
      <Card className="u-ta-left">
        <OrderedList className="u-mv-0">
          <ListItem
            dangerouslySetInnerHTML={{
              __html: snarkdown(
                t(`InstallationStep.step1.${browser.name}`)
              )
            }}
          />
          <ListItem
            dangerouslySetInnerHTML={{
              __html: snarkdown(
                t(`InstallationStep.step2.${browser.name}`)
              )
            }}
          />
          <ListItem
            dangerouslySetInnerHTML={{
              __html: snarkdown(
                canAuthWithOIDC(client)
                  ? t('InstallationStep.step3-oidc', {
                      address: cozyURL.host
                    })
                  : t('InstallationStep.step3', {
                      address: cozyURL.host
                    })
              )
            }}
          />
        </OrderedList>
      </Card>
      <Button
        href={storeURL}
        target="_blank"
        label={t('InstallationStep.cta')}
        style={{ color: 'var(--primaryContrastTextColor)' }}
        className="u-mt-2-half u-w-100"
        onClick={onGoToStore}
      />
      <Button
        label={storeVisited ? t('InstallationStep.login') : t('InstallationStep.skip')}
        onClick={onSkipExtension}
        variant="secondary"
        className="u-mt-half u-w-100"
      />
    </Stack>
  )
}

export default InstallationStepWebPart
