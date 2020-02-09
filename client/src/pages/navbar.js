import React from 'react'
import { Icon, Dropdown, Menu, Label } from 'semantic-ui-react'
import {
  BrowserRouter as Router, Route, Link, Redirect, withRouter
} from 'react-router-dom'
import Siivousaineet from './Siivousaineet'
import Etusivu from './etusivu'

const Navbar = () => {
  return (
    <Router>
      <div>
        <header>
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
               
                  
                <Icon name = 'shopping cart'></Icon>
                </Link>

              </Menu.Item>
              <Menu.Item>
                
              </Menu.Item>
              
            </Menu.Menu>
          </Menu>
        </header>
        {/* <Route exact path = '/' render = {() => <Etusivu />} />
        <Route path = '/siivousaineet' render = {() => <Siivousaineet />} /> */}
      </div>
    </Router>
  )
}

export default Navbar