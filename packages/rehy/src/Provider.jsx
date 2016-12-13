import {Provider as IntlProvider} from 'react-intl-redux'
import React, {PropTypes} from 'react'

const Provider = ({children, store}) => {
  return (
    <IntlProvider store={store}>
      {children}
    </IntlProvider>
  )
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
  store: PropTypes.object.isRequired,
}

export default Provider
