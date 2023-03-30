import React from 'react'
import snarkdown from 'snarkdown'

import NarrowContent from 'cozy-ui/transpiled/react/NarrowContent'
import Stack from 'cozy-ui/transpiled/react/Stack'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { useClient } from 'cozy-client'

import { canAuthWithOIDC } from 'cozy/react/helpers/oidc'
import Wrapper from 'cozy/react/components/Wrapper'
import CloudIcon from 'cozy/react/components/CloudIcon'
import VerticallyCentered from 'cozy/react/components/VerticallyCentered'
import Help from 'cozy/react/components/Help'

import setupTutorialIllustration from 'cozy/react/assets/setup-tutorial.gif'
import './styles.css'

import DrawingArrowUpIcon from 'cozy-ui/transpiled/react/Icons/DrawingArrowUp'

const InstalledStep = () => {
  const client = useClient()
  const { t } = useI18n()

  const cozyURL = new URL(client.getStackClient().uri)

  return (
    <VerticallyCentered>
      <Wrapper>
        <NarrowContent>
          <Stack spacing="xxl">
            <div className="InstalledStep__illustration">
              <img
                src={setupTutorialIllustration}
                alt=""
                width="512"
                height="220"
              />
              <Icon icon={DrawingArrowUpIcon} width={96} height={86} />
            </div>
            <Stack spacing="m">
              <Typography variant="h3" component="h1" className="InstalledStep__title">
                {t('InstalledStep.title')}
              </Typography>
              <Typography variant="body1" className="InstalledStep__description">
                <span
                  dangerouslySetInnerHTML={{
                    __html: snarkdown(
                      t('InstalledStep.descriptionStart', {
                        address: cozyURL.host
                      })
                    )
                  }}
                />{' '}
                <CloudIcon />{' '}
                <span
                  dangerouslySetInnerHTML={{
                    __html: snarkdown(
                      t(
                        canAuthWithOIDC(client)
                          ? 'InstalledStep.descriptionEnd-oidc'
                          : 'InstalledStep.descriptionEnd',

                        {
                          address: cozyURL.host
                        }
                      )
                    )
                  }}
                />
              </Typography>
            </Stack>
            <Help />
          </Stack>
        </NarrowContent>
      </Wrapper>
    </VerticallyCentered>
  )
}

export default InstalledStep
