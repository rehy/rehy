import {IntlProvider} from 'react-intl'
import {Provider as ReduxProvider} from 'react-redux'
import React, {PropTypes} from 'react'

const Provider = ({children, defaultLocale, locale, store}) => {
  return (
    <ReduxProvider store={store}>
      <IntlProvider locale={locale} defaultLocale={defaultLocale}>
        {children}
      </IntlProvider>
    </ReduxProvider>
  )
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultLocale: PropTypes.string,
  locale: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired,
}

Provider.defaultProps = {
  locale: 'en',
}

export default Provider
