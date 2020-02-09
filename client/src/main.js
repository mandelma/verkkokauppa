import React from 'react'
import { connect } from 'react-redux'
import { Icon, Dropdown, Menu, Label } from 'semantic-ui-react'
import {
  BrowserRouter as Router, Route, Link, Redirect, withRouter, HashRouter
} from 'react-router-dom'
import Etusivu from './pages/etusivu'
import About from './pages/about'
import Ostoskori from './pages/ostoskori'
import Siivousaineet from './pages/Siivousaineet'
import Login from './pages/login'
import Register from './pages/register'
import History from './pages/history'
import { logOut } from './reducers/loginReducer'


const Main = (props) => {
  
  
  const trigger = (
    <span>
      <Icon name = 'user' />Hello, {props.logIn.name}
    </span>
  )

  
  
  const logOutUser = () => {
    props.logOut()
  }

  return (
    <div>
      <Router>
        <div>
          <div className = 'header'>
            <Menu stackable size = 'huge' color = 'grey' inverted>
              <Menu.Item name = 'home' >
                <Link to = '/' >Etusivu</Link>
              </Menu.Item>
              <Menu.Item link>
                <Link to = '/about'>Tiedot meistä</Link>
              </Menu.Item>

              <Dropdown item text='Tuotteet' >            
                <Dropdown.Menu style = {{backgroundColor: 'grey'}}>
                  <Dropdown.Item>
                    <Link to = '/siivousaineet'>Siivousaineet</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to = 'siivousvalineet'>Siivousvälineet</Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown item text='Palvelut' >
                <Dropdown.Menu style = {{backgroundColor: 'grey'}}>
                  <Dropdown.Item>
                    <Link to = '/kotisiivous'>Kotisiivous</Link>
                  </Dropdown.Item>
                  
                </Dropdown.Menu>
              </Dropdown>
              
              <Menu.Menu position='right'>
                <Menu.Item>

                  <Link to = '/ostoskori'>Ostoskori
                    {props.cart.length > 0 &&
                    <Label circular color  = 'red'>{props.cart.length}</Label>}
                      
                    <Icon name = 'shopping cart'></Icon>
                  </Link>

                </Menu.Item>
                {props.userIn
                ? <Menu.Item>

                    <Dropdown trigger = {trigger}>
                      <Dropdown.Menu>
                        <Dropdown.Item text='Account' icon='user' as={Link} to='/accounts'/>
                        <Dropdown.Item text='Settings' icon='settings' as={Link} to='/settings'/>
                        <Dropdown.Item text='History' icon='history' as={Link} to='/history' />
                        <Dropdown.Item text='Sign Out' icon='sign out' onClick = {() => logOutUser()}/>
                      </Dropdown.Menu>
                    </Dropdown>
                  
                    {/* <Dropdown 
                      trigger = {trigger} 
                      options = {options}
                      onChange = {handleOptions}
                    />  */}
                  </Menu.Item> 
                  : <Menu.Item>
                  <Link to = '/login'>Login</Link></Menu.Item>}
                
              </Menu.Menu>
            </Menu>
          </div>

          <Route exact path = '/' render = {() => <Etusivu />} />
          <Route path = '/about' render = {() => <About />} />
          <Route path = '/siivousaineet' render = {() => <Siivousaineet />}  />
          <Route path = '/ostoskori' render = {() => <Ostoskori />} />
          <Route path = '/login' render = {() => !props.userIn ? <Login /> : <Redirect to = '/' />} />
          <Route path = '/register' render = {() => <Register />} />
          <Route path = '/history' render = {() => props.userIn ? <History logIn = {props.logIn}/> : <Redirect to = '/' />} />
        </div>

      </Router>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  console.log('state is', state)
  console.log('OwnProps are here', ownProps)
  return {
    cart: state.cart,
    user: state.user,
    userIn: state.userIn

    
  }
}

const mapDispatchToProps = {
  logOut
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)