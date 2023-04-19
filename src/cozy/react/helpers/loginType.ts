import CozyClient, { Q } from 'cozy-client';
// @ts-ignore
import flag from 'cozy-flags';

export const canAuthWithOIDC = (client: CozyClient) => {
  return isOidcAuth(client);
};

export const shouldCreatePassword = async (client: CozyClient) => {
  const passwordDefined = await isPasswordDefined(client);

  return (isOidcAuth(client) || isMagicLinkAuth(client)) && !passwordDefined;
};

const isMagicLinkAuth = (client: CozyClient) => {
  return client?.capabilities?.can_auth_with_magic_links;
};

const isOidcAuth = (client: CozyClient) => {
  if (flag('passwords.oidc-auth')) {
    return true;
  }
  return client?.capabilities?.can_auth_with_oidc;
};

const isPasswordDefined = async (client: CozyClient) => {
  const result = await client.query(
    Q('io.cozy.settings').getById('io.cozy.settings.instance'),
    {
      as: 'io.cozy.settings/io.cozy.settings.instance',
    }
  );

  if (!isInstanceSettings(result)) {
    throw new Error('We encountered a problem while querying /settings/instance data');
  }

  return result.data.attributes.password_defined;
};

const isInstanceSettingsData = (obj: unknown): obj is InstanceSettingsData => {
  return typeof obj === 'object' && obj !== null && 'attributes' in obj;
};

const isInstanceSettings = (item: unknown): item is InstanceSettings => {
  return (
    typeof item === 'object' &&
    item !== null &&
    'data' in item &&
    isInstanceSettingsData((item as Partial<InstanceSettings>).data)
  );
};

interface InstanceSettingsData {
  attributes: {
    password_defined?: boolean;
  };
}

interface InstanceSettings {
  data: InstanceSettingsData;
}
