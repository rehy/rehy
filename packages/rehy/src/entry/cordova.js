import {handleDeviceReady, listenToDeviceReady} from '../actions/cordova'

export default ({store}) => {
  store.dispatch(listenToDeviceReady(handleDeviceReady))
}
