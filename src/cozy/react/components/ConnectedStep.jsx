import React from 'react'
import Wrapper from 'cozy/react/components/Wrapper'
import NarrowContent from 'cozy-ui/transpiled/react/NarrowContent'
import Stack from 'cozy-ui/transpiled/react/Stack'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { currentBrowser } from '../currentBrowser'
import chromeIllustration from 'cozy/react/assets/extension-connected-chrome.svg'
import firefoxIllustration from 'cozy/react/assets/extension-connected-firefox.svg'
import Help from './Help'
import { ButtonLink } from 'cozy-ui/transpiled/react/Button'
import BarTitle from 'cozy/react/BarTitle'

const illustrations = {
  chrome: chromeIllustration,
  firefox: firefoxIllustration
}

const ImportedPageLink = () => {
  const { t } = useI18n()
  return (
    <p>
      <ButtonLink theme="secondary" href="#/installation/import">
        {t('Help.import')}
      </ButtonLink>
    </p>
  )
}

const ConnectedStep = () => {
  const { t } = useI18n()

  return (
    <Wrapper>
      <BarTitle>{t('Nav.installation')}</BarTitle>
      <NarrowContent>
        <Stack spacing="xxl">
          <img
            height={230}
            width={512}
            src={illustrations[currentBrowser.name]}
            alt=""
          />
          <Stack spacing="m">
            <Typography variant="h3" component="h1">{t('ConnectedStep.title')}</Typography>
            <Typography variant="body1">{t('ConnectedStep.description')}</Typography>
          </Stack>
          <Stack spacing="l">
            <ImportedPageLink />
            <Help />
          </Stack>
        </Stack>
      </NarrowContent>
    </Wrapper>
  )
}

export default ConnectedStep
