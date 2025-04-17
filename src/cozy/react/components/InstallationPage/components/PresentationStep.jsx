import React from 'react'
import cx from 'classnames'
import { isMobile } from 'cozy-device-helper'

import Button from "cozy-ui/transpiled/react/Buttons"
import Stack from 'cozy-ui/transpiled/react/Stack'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from "cozy-ui/transpiled/react/providers/I18n"

import Infos from "cozy-ui/transpiled/react/deprecated/Infos"
import Icon from 'cozy-ui/transpiled/react/Icon'
import Hero, {
  Title,
  Section,
  Sections,
  CTA
} from 'cozy-ui/transpiled/react/Hero'
import PasswordIcon from 'cozy-ui/transpiled/react/Icons/Password'
import LockIcon from 'cozy-ui/transpiled/react/Icons/Lock'
import ToTheCloudIcon from 'cozy-ui/transpiled/react/Icons/ToTheCloud'

import importPasswordsIcon from 'cozy/react/assets/import-passwords.svg'
import { STEPS } from 'cozy/react/steps'
import CircleIcon from '../../CircleIcon'
import Wrapper from '../../Wrapper'
import getSupportedPlatforms from 'cozy/react/supportedPlatforms'
import { isSupportedBrowser, browserName } from 'cozy/react/currentBrowser'
import browserIcons from '../../browserIcons'
import VerticallyCentered from '../../VerticallyCentered'

const Section1 = () => {
  const { t } = useI18n()
  return (
    <Section>
      <CircleIcon icon={LockIcon} size={32} color="var(--slateGrey)" />
      <Typography variant="body1" element="p">{t('PresentationStep.item1')}</Typography>
    </Section>
  )
}

const Section2 = () => {
  const { t } = useI18n()
  return (
    <Section>
      <CircleIcon icon={PasswordIcon} size={32} color="var(--slateGrey)" />
      <Typography variant="body1" element="p">{t('PresentationStep.item2')}</Typography>
    </Section>
  )
}

const Section3 = () => {
  const { t } = useI18n()
  return (
    <Section>
      <CircleIcon icon={ToTheCloudIcon} size={32} color="var(--slateGrey)" />
      <Typography variant="body1" element="p">{t('PresentationStep.item3')}</Typography>
    </Section>
  )
}

const UnsupportedBrowser = () => {
  const { t } = useI18n()
  const supportedPlatforms = getSupportedPlatforms()
  return (
    <Infos
      className="u-ta-left"
      theme="danger"
      description={
        <>
          <Typography variant="h5" className="u-pomegranate">
            {t('PresentationStep.notSupportedInfos.title', {
              browser: browserName
            })}
          </Typography>
          <Typography variant="body1">
            {t('PresentationStep.notSupportedInfos.description', {
              browser: browserName
            })}
          </Typography>
        </>
      }
      action={Object.entries(supportedPlatforms)
        .filter(([, infos]) => infos.type === 'browser')
        .map(([platform, infos], index) => (
          <Button
            key={platform}
            href={infos.storeUrl}
            icon={
              <Icon
                icon={browserIcons[platform]}
                size={16}
              />
            }
            variant="secondary"
            label={infos.label}
            className="u-mr-1"
          />
        ))}
    />
  )
}

const PresentationStep = ({ navigate }) => {
  const { t } = useI18n()
  return (
    <VerticallyCentered>
      <Wrapper>
        <Stack>
          <img src={importPasswordsIcon} alt="" height={191} />
          <Hero>
            <Title className="u-mb-0">{t('PresentationStep.title')}</Title>
            <Typography variant="body1" className="u-mb-3" element="p">
              {t('PresentationStep.description')}
            </Typography>
            <Sections className="u-mb-2">
              <Section1 />
              <Section2 />
              <Section3 />
            </Sections>
            {isSupportedBrowser() || isMobile() ? (
              <CTA>
                <Button
                  onClick={() => navigate({ route: STEPS.SECURITY })}
                  label={t('PresentationStep.cta')}
                  className="u-w-100"
                />
              </CTA>
            ) : (
              <UnsupportedBrowser />
            )}
          </Hero>
        </Stack>
      </Wrapper>
    </VerticallyCentered>
  )
}

export default PresentationStep
