import { useClient } from 'cozy-client';
import { useEffect, useState } from 'react';

import { shouldCreatePassword as shouldCreatePasswordFn } from '../../helpers/loginType';

export const useShouldCreatePassword = (): boolean | undefined => {
  const client = useClient();
  const [shouldCreatePassword, setShouldCreatePassword] = useState(undefined);

  useEffect(() => {
    const checkShouldCreatePassword = async () => {
      const result = await shouldCreatePasswordFn(client);
      setShouldCreatePassword(result);
    };

    checkShouldCreatePassword();
  }, [client]);

  return shouldCreatePassword;
};
