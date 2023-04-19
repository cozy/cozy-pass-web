import CozyClient from 'cozy-client';
// @ts-ignore
import flag from 'cozy-flags'

export const canAuthWithOIDC = (client: CozyClient) => {
  if (flag('passwords.oidc-auth')) {
    return true
  }
  return client?.capabilities?.can_auth_with_oidc
}
