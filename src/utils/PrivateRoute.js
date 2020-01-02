import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {

        if (user) {
          return <Component {...props}></Component>
        } else {
          return <Redirect to={{
            pathname: '/login',
            state: {
              redirect: props.match.url
            }
          }}></Redirect>
        }

      }}
      >
    </Route>
  )
}

export default connect(
  (state) => ({
    user: state.user
  })
)(PrivateRoute)