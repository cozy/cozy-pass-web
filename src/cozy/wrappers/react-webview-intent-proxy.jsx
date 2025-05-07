import { useState, useEffect } from 'react'
import { useWebviewIntent } from 'cozy-intent'

export const useWebviewIntentProxy = () => {
  const webviewIntent = useWebviewIntent();

  useEffect(() => {
    if (!webviewIntent) return;

    window.addEventListener('onWebviewIntentCall', (eventReceived) => {
      const { detail: { name, options } } = eventReceived

        webviewIntent.call(name, options).then((result) => {
            const eventToSend = new CustomEvent('onWebviewIntentCallResult', { detail: { name, result } })
            window.dispatchEvent(eventToSend)
        })
    })
  }, [webviewIntent])
};
