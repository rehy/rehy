/* global cordova */
export const handleDeviceReady = () => () => {
  if (navigator.splashscreen) {
    navigator.splashscreen.hide()
  }
}
