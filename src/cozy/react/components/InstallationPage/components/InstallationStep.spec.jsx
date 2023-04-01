import React from 'react'
import {
  useExtensionStatus,
  extensionStatuses
} from '../../../helpers/extensionStatus'
import { render } from '@testing-library/react'
import InstallationStep from './InstallationStep'
import AppLike from '../../../test/lib/AppLike'

jest.mock('../../helpers/extensionStatus')

const setup = () => {
  return render(
    <AppLike>
      <InstallationStep />
    </AppLike>
  )
}

describe('when extension is connected', () => {
  beforeEach(() => {
    useExtensionStatus.mockReturnValue(extensionStatuses.connected)
  })

  it('should show ConnectedStep', async () => {
    const { getByText } = setup()
    expect(getByText('Your password manager is configured!')).toBeDefined()
  })
})
