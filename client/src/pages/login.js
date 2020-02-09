import React, { useState } from 'react'
import { connect } from 'react-redux'
import Footer from './footer'
import Register from './register'
import { logInUser, logOut } from '../reducers/loginReducer'
import { Segment, Grid, Button, Divider, Form } from 'semantic-ui-react'

import userService from '../services/users'
import {
  BrowserRouter as Router, Route, Link, Redirect, withRouter, useRouteMatch
} from 'react-router-dom'

const Login = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    //userLogin({ username: username, password: password})
    props.logInUser(username, password)
    console.log()
    console.log('username: ', e.target.username.value)
    console.log('target value: ', username)
    console.log('password value: ', e.target.password.value)

    e.target.username.value = ''
    e.target.password.value = ''
  }

  
  return (
    <div>
      <section>
        <Segment placeholder>
          <Grid columns={2} relaxed='very' centered stackable>
            <Grid.Column>
              <Form onSubmit = {handleLogin}>
                <Form.Input
                  icon='user'
                  iconPosition='left'
                  label='Username'
                  placeholder='Username'
                  name = 'username'

                  onChange = {({ target }) => setUsername(target.value)}
                />
                <Form.Input
                  icon='lock'
                  iconPosition='left'
                  label='Password'
                  type='password'
                  name = 'password'
                  onChange = {({ target }) => setPassword(target.value)}
                />
                <Button content='Login'
                  type = 'submit' primary />
              </Form>
            </Grid.Column>
            <Divider vertical>Or</Divider>
            <Grid.Column verticalAlign='middle'>

              <Link to = '/register' className='ui big green button'>
                <i className='signup icon'></i>
                Uusi asiakas
              </Link>
            </Grid.Column>
          </Grid>
        </Segment>
      </section>
      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = {
  logInUser
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Login)
