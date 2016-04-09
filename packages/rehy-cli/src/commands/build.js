import _ from 'lodash'

import cordovaBulid from '../cordova'

export default ({config}) => {
  cordovaBulid(config).catch(console.log.bind(console))
}
