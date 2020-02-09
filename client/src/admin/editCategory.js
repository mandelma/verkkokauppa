import React, { useState } from 'react'
import { Icon, Popup, Button, Menu, Table, Form } from 'semantic-ui-react'

const EditCategory = ({ setEdit, name, updateCategory, id }) => {
  const [input, setInput] = useState('')

  const updateCat = () => {
    try {
      const categoryName = {
        name: input
      }
      updateCategory(id, categoryName)
    } catch (err) {
      console.log('Error:', err)
    }
    setEdit(false)
  }
  
  return (
    <div>
      <Menu stackable size = 'huge' inverted color = 'grey' position = 'right'>
          <Menu.Item>
            <h3>Kategooriat</h3>
          </Menu.Item>
          <Menu.Menu position = 'right'>
            <Menu.Item>
              <Popup content = 'Tallenna uusi kategooria' trigger = {<Button icon  = 'save' positive 
              onClick = {() => updateCat()}/>} />
            </Menu.Item>
            <Menu.Item>
              <Popup content = 'Keskeytä' trigger = {<Button icon  = 'undo alternate' primary 
              onClick = {() => setEdit(false)}/>} />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <p>Kategoria on: {name}</p>
        <Form>
          <Form.Field>
            <Form.Input fluid label = 'Muokka kategoria:' placeholder = 'Uusi kategoria' name = 'cat'
              onChange = {({ target }) => setInput(target.value)}/>
          </Form.Field>
        </Form>
    </div>
  )
}

export default EditCategory