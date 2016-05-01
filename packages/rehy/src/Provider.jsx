import {Provider as IntlProvider} from 'react-intl-redux'
import React, {PropTypes} from 'react'

const Provider = ({children, defaultLocale, locale, store}) => {
  return (
    <IntlProvider store={store} locale={locale} defaultLocale={defaultLocale}>
      {children}
    </IntlProvider>
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
