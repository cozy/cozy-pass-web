import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import snarkdown from 'snarkdown'

import Button from 'cozy-ui/transpiled/react/Button'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import NarrowContent from 'cozy-ui/transpiled/react/NarrowContent'
import PasswordExample from 'cozy-ui/transpiled/react/PasswordExample'
import Stack from 'cozy-ui/transpiled/react/Stack'
import Card from 'cozy-ui/transpiled/react/Card'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { UnorderedList, ListItem } from 'cozy-ui/transpiled/react/UnorderedList'
import flag from 'cozy-flags'

import { STEPS } from 'cozy/react/steps'
import Wrapper from 'cozy/react/components/Wrapper'
import VerticallyCentered from 'cozy/react/components/VerticallyCentered'
import strongPasswordIcon from 'cozy/react/assets/strong-password.svg'
import ChangePasswordLink from 'cozy/react/components/ChangePasswordLink'
import { useShouldCreatePassword } from 'cozy/react/components/InstallationPage/useShouldCreatePassword'
import SetVaultPasswordForm from 'cozy/react/components/SetVaultPasswordForm'
import { BitwardenSettingsContext } from 'cozy/react/bitwarden-settings'

const ImprovePasswordStep = ({ navigate }) => {
  const { t } = useI18n()

  const onKeepPassword = () => navigate({ route: STEPS.HINT })

  return (
    <VerticallyCentered>
      <Wrapper>
        <NarrowContent>
          <Stack>
            <img src={strongPasswordIcon} alt="" width={204} height={137} />
            <Typography variant="h3" component="h1">{t('SecurityStep.title')}</Typography>
            <Stack spacing="xxl">
              <Typography variant="body1">{t('SecurityStep.description')}</Typography>
              <Card>
                <UnorderedList className="u-ta-left u-mv-0">
                  <ListItem
                    dangerouslySetInnerHTML={{
                      __html: snarkdown(
                        t('SecurityStep.advices.strong_passphrase')
                      )
                    }}
                  />
                  <ListItem
                    dangerouslySetInnerHTML={{
                      __html: snarkdown(t('SecurityStep.advices.memorize'))
                    }}
                  />
                  <ListItem>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: snarkdown(t('SecurityStep.advices.our_tip'))
                      }}
                    />
                    <PasswordExample
                      color={false}
                      password={t('SecurityStep.password-example')}
                    />
                  </ListItem>
                </UnorderedList>
              </Card>
              <Stack spacing="xs">
                <ChangePasswordLink
                  label={t('SecurityStep.enhance-password')}
                  successRoute="#/installation/installation"
                  cancelRoute="#/installation/hint"
                  extension="full"
                />
                <Button
                  tag={Link}
                  onClick={onKeepPassword}
                  label={t('SecurityStep.keep-password')}
                  theme="secondary"
                  className="u-mt-half"
                  extension="full"
                />
              </Stack>
            </Stack>
          </Stack>
        </NarrowContent>
      </Wrapper>
    </VerticallyCentered>
  )
}

const CreatePasswordStep = ({ navigate }) => {
  const { t } = useI18n()

  const onNext = () => navigate({ route: STEPS.HINT })

  const bitwardenSettings = useContext(BitwardenSettingsContext)
  const rawIsVaultConfigured =
    bitwardenSettings && bitwardenSettings.extension_installed

  const isVaultConfigured = 
    flag('passwords.force-vault-configured') === null
      ? rawIsVaultConfigured
      : flag('passwords.force-vault-configured')

  return (
    <VerticallyCentered>
      <Wrapper>
        <NarrowContent>
          <Stack>
            <img src={strongPasswordIcon} alt="" width={204} height={137} />
            <Typography variant="h3" component="h1">
              {isVaultConfigured
                ? t('SecurityStepOIDC.title-configured')
                : t('SecurityStepOIDC.title')}
            </Typography>
            <Stack spacing="xl">
              <Typography variant="body1">
                {isVaultConfigured
                  ? t('SecurityStepOIDC.description-configured')
                  : t('SecurityStepOIDC.description')}
              </Typography>
              {isVaultConfigured ? (
                <div>
                  <ChangePasswordLink
                    extension="full"
                    theme="secondary"
                    label={t('UpdateCozyPassPassword')}
                    successRoute="#/installation/installation"
                    cancelRoute="#/installation/installation"
                  />
                </div>
              ) : (
                <>
                  <SetVaultPasswordForm onSuccess={onNext} />
                  <Card>
                    <UnorderedList className="u-ta-left u-mv-0">
                      <ListItem
                        dangerouslySetInnerHTML={{
                          __html: snarkdown(
                            t('SecurityStep.advices.strong_passphrase')
                          )
                        }}
                      />
                      <ListItem
                        dangerouslySetInnerHTML={{
                          __html: snarkdown(t('SecurityStep.advices.memorize'))
                        }}
                      />
                      <ListItem>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: snarkdown(t('SecurityStep.advices.our_tip'))
                          }}
                        />
                        <PasswordExample
                          color={false}
                          password={t('SecurityStep.password-example')}
                        />
                      </ListItem>
                    </UnorderedList>
                  </Card>
                </>
              )}
            </Stack>
          </Stack>
        </NarrowContent>
      </Wrapper>
    </VerticallyCentered>
  )
}

const SecurityStep = ({ navigate }) => {
  const shouldCreatePassword = useShouldCreatePassword()

  if (shouldCreatePassword === undefined) {
    return null
  }

  if (shouldCreatePassword) {
    return <CreatePasswordStep navigate={navigate} />
  }
  return <ImprovePasswordStep navigate={navigate} />
}

export default SecurityStep
