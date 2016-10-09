/* global cordova */
import { listenToEvent } from './event'

export const handleDeviceReady = () => () => {
  if (navigator.splashscreen) {
    navigator.splashscreen.hide()
  }
}

export function listenToDeviceReady(action) {
  return listenToEvent('deviceready', action, {
    args: [false],
    target: document,
  })
}
