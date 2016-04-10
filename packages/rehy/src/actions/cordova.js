/* global cordova */
export const handleDeviceReady = () => {
  return (dispatch) => {
    if (navigator.splashscreen) {
      navigator.splashscreen.hide()
    }
  }
}
