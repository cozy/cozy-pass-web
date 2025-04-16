import React from 'react'

import generateWebAppLink from 'cozy/react/helpers/generateWebAppLink'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'
import { ButtonLink } from "cozy-ui/transpiled/react/deprecated/Button"

import { useClient } from 'cozy-client'

const SETTINGS_APP_SLUG = 'settings'
const PASSWORD_APP_SLUG = 'passwords'

const app = {
  slug: SETTINGS_APP_SLUG
}

const ChangePasswordLink = ({
  successRoute,
  cancelRoute,
  Component,
  ...props
}) => {
  const client = useClient()
  const rawSettingsAppHref = generateWebAppLink(SETTINGS_APP_SLUG, client)
  const passwordsUrl = generateWebAppLink(PASSWORD_APP_SLUG, client)

  const successUrl = new URL(successRoute, passwordsUrl).href
  const cancelUrl = new URL(cancelRoute, passwordsUrl).href

  const settingsPath = '#/profile/password'
  const settingsQuery = `?redirect_success=${encodeURIComponent(
    successUrl
  )}&redirect_cancel=${encodeURIComponent(cancelUrl)}`

  const settingsAppHref = new URL(
    settingsPath + settingsQuery,
    rawSettingsAppHref
  ).href

  return (
    <AppLinker app={app} href={settingsAppHref}>
      {({ onClick, href }) => (
        <Component href={href} onClick={onClick} {...props} />
      )}
    </AppLinker>
  )
}

ChangePasswordLink.defaultProps = {
  Component: ButtonLink
}

export default ChangePasswordLink
