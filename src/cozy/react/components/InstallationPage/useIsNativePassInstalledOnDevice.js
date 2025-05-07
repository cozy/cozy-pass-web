import { useState, useEffect } from 'react'

const useIsNativePassInstalledOnDevice = () => {
  const [isNativePassInstalledOnDevice, setIsNativePassInstalledOnDevice] = useState(false)

  useEffect(() => {
    window.addEventListener('onWebviewIntentCallResult', (eventReceived) => {
        const { detail: { name, result } } = eventReceived

        if (name === 'isNativePassInstalledOnDevice') {
            setIsNativePassInstalledOnDevice(result)
        }
    })

    const eventToSend = new CustomEvent('onWebviewIntentCall', { detail: { name: 'isNativePassInstalledOnDevice' } })

    window.dispatchEvent(eventToSend)
  }, [])

  return isNativePassInstalledOnDevice
}

export default useIsNativePassInstalledOnDevice
