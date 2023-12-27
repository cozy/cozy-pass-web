import React, { useState, useContext } from 'react'

import { useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import Button from 'cozy-ui/transpiled/react/Button'
import Input from 'cozy-ui/transpiled/react/Input'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Wrapper from 'cozy/react/components/Wrapper'
import NarrowContent from 'cozy-ui/transpiled/react/NarrowContent'
import passwordClueIcon from 'cozy/react/assets/password-clue.svg'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Stack from 'cozy-ui/transpiled/react/Stack'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import VerticallyCentered from '../../VerticallyCentered'
import { STEPS } from 'cozy/react/steps'
import { BitwardenSettingsContext } from 'cozy/react/bitwarden-settings'

const HintStep = ({ navigate }) => {
  const client = useClient()
  const { t } = useI18n()
  const [hint, setHint] = useState('')
  const [saving, setSaving] = useState(false)

  const bitwardenSettings = useContext(BitwardenSettingsContext)
  const { hasHint } = bitwardenSettings

  const goToNextStep = () => navigate({ route: STEPS.INSTALLATION })

  const handleSubmit = async e => {
    e.preventDefault()

    setSaving(true)

    try {
      await client.getStackClient().fetchJSON('PUT', '/settings/hint', {
        hint
      })

      goToNextStep()
    } catch (err) {
      if (err.status === 422 && err.reason?.errors?.[0].detail === 'The hint cannot be the same as the password') {
        Alerter.error(t('HintStep.errorSamePassword'))
      } else {
        Alerter.error(t('HintStep.error'))
      }

      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <VerticallyCentered>
      <Wrapper>
        <NarrowContent>
          <Stack spacing="xxl" tag="form" onSubmit={handleSubmit}>
            <Stack spacing="m">
              <img src={passwordClueIcon} alt="" height={137} />
              <Typography variant="h3" component="h1" className="u-mt-1">{t('HintStep.title')}</Typography>
              <Typography variant="body1">
                {hasHint === null ? (
                  <Spinner size="small" />
                ) : hasHint === false ? (
                  t('HintStep.please-configure-hint')
                ) : (
                  t('HintStep.hint-configured')
                )}
              </Typography>
            </Stack>
            <Stack spacing="m">
              <Input
                placeholder={t('HintStep.placeholder')}
                value={hint}
                onChange={e => setHint(e.target.value)}
              />
              <Typography variant="body1">{t('HintStep.description')}</Typography>
            </Stack>
            <Button
              label={t('HintStep.submit')}
              disabled={saving || hint === ''}
              busy={saving}
              extension="full"
              className="u-mt-2"
            />
            {hasHint ? (
              <Button
                label={t('HintStep.skip')}
                disabled={saving}
                extension="full"
                onClick={goToNextStep}
                theme="secondary"
                className="u-mt-half"
              />
            ) : null}
          </Stack>
        </NarrowContent>
      </Wrapper>
    </VerticallyCentered>
  )
}

export default HintStep
