import { handleDeviceReady } from '../actions/cordova'
import { listenToEvent } from '../actions/event'

export default ({ store }) => {
  store.dispatch(listenToEvent('deviceready', handleDeviceReady, {
    args: [false],
    target: document,
  }))
}
