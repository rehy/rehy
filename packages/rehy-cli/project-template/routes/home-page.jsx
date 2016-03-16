import {connect} from 'react-redux'
import React from 'react'

const HomePage = () => {
  return (
    <div>Hello World!</div>
  )
}

export default connect(
  (state) => {
    return {}
  }
)(HomePage)
