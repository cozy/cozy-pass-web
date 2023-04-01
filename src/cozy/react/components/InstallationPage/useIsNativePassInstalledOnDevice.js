import { useState, useEffect } from 'react'

import { useWebviewIntent } from 'cozy-intent'

const useIsNativePassInstalledOnDevice = () => {
  const webviewIntent = useWebviewIntent()

  const [isNativePassInstalledOnDevice, setIsNativePassInstalledOnDevice] = useState(false)

  useEffect(() => {
    const checkNativePassInstallationOnDevice = async () => {
      const intentResult = await webviewIntent?.call('isNativePassInstalledOnDevice')
      setIsNativePassInstalledOnDevice(intentResult)
    }

    checkNativePassInstallationOnDevice()
  }, [webviewIntent])

  return isNativePassInstalledOnDevice
}

export default useIsNativePassInstalledOnDevice
