import React, { useState } from 'react'
import { Icon, Dropdown, Menu } from 'semantic-ui-react'
import {
  BrowserRouter as Router, Route, Link, Redirect
} from 'react-router-dom'
import AdminEtusivu from './adminEtusivu'
import Category from './category'
import Tuotteet from './Tuotteet'

const Admin = () => {
  const [activeItem, setActiveItem] = useState('etusivu')
  const [page, setPage] = useState('etusivu')
  const trigger = (
    <span>
      <Icon name = 'user' />Hello, Admin
    </span>
  )
  
  // Creating optiond for dropdown menu
  const options = [
    {
      key: 'user',
      text: (
      <span>Signed in as: <strong>Admin</strong></span>
      )
    },
    { key: 'logOut', text: 'Log out', value: 'logOut'},
    { key: 'kauppa', text: 'Kotisivu', value: 'kauppa'}
  ]

  const handleOptions = (event, { value }) => {
    if (value === 'logOut') {
      console.log('loging out')
    }
    if (value === 'kauppa') {
      console.log('kauppan sivu')
      
      
    }
  }

  const handleItemClick = (e, { name }) => {
    console.log('item click name:', name)
    setActiveItem(name)
    setPage(name)
  }

  const content = () => {
    if (page === 'etusivu') {
      return (
        <AdminEtusivu />
      )
    }
    else if (page === 'kategoria') {
      return (
        <Category />
      )
    }
    else if (page === 'tuotteet') {
      return (
        <Tuotteet />
      )
    }
    
  }

  return (
    <div>
      <div className='adHeader'>
        <Router>
          <div>
            <Menu stackable size = 'huge'>            
              <Menu.Menu position='right'>
                
                <Menu.Item>
                  <Dropdown 
                    trigger = {trigger} 
                    options = {options}
                    onChange = {handleOptions}
                  />
                </Menu.Item> 
             
              </Menu.Menu>
            </Menu>
          </div>
        </Router>
        <div className = 'adminSection'>
          <div className = 'adminAside'>
            <div style = {{textAlign: "center"}}>
              <h3>Järjestelmänvalvoja: </h3>
              
            </div>

            <Menu color = 'grey' inverted vertical fluid>
              <Menu.Item
                name='etusivu'
                active={activeItem === 'etusivu'}
                onClick={handleItemClick}
              />
              <Menu.Item
                name='kategoria'
                active={activeItem === 'kategoria'}
                onClick={handleItemClick}
              />
              <Menu.Item
                name='tuotteet'
                active={activeItem === 'tuotteet'}
                onClick={handleItemClick}
              />
            </Menu>
          </div>
          <div className = 'adminContainer'>
            {content()}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Admin