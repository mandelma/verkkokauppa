import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Icon, Popup, Button, Menu, Table, Form, Message } from 'semantic-ui-react'
import { createCategory, updateCategory } from '../reducers/categoryReducer'
import { message } from '../reducers/message/messageReduser'
import { errorMessage } from '../reducers/message/errMessageReduser'
//import { openNewCat } from '../reducers/createCategoryReducer'
import EditCategory from './editCategory'

const Category = (props) => {
  const [isCreateCat, setIsCreateCat]  = useState(false)
  const [isEditCat, setIsEditCat] = useState(false)
  const [newCat, setNewCat] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categoryName, setCategoryName] = useState('')

  const openCat = () => {
    setIsCreateCat(true)
  }

  const addNewCat = () => {
    console.log('new cat name', newCat)
    try {
      if (newCat === '') {
        props.errorMessage('Kategorian nimen kentta ei voi olla tyhjä!', 5)
      } else {
        props.createCategory(newCat)
        props.message('Uusi kategooria ' + newCat + ' luotu onnistuneesti!', 5)
        setNewCat('')
      }
      
    } catch (err) {
        console.log('Error:', err)
    }
    setIsCreateCat(false)
    
  }

  const openEditCat = (cat) => {
    setIsEditCat(true)
    setCategoryId(cat.id)
    setCategoryName(cat.name)
  }

  if (isCreateCat) {
    return (
      <div>
        <Menu stackable size = 'huge' inverted color = 'grey' position = 'right'>
          <Menu.Item>
            <h3>Kategooriat</h3>
          </Menu.Item>
          <Menu.Menu position = 'right'>
            <Menu.Item>
              <Popup content = 'Tallenna uusi kategooria' trigger = {<Button icon  = 'save' positive 
              onClick = {() => addNewCat()}/>} />
            </Menu.Item>
            <Menu.Item>
              <Popup content = 'Keskeytä' trigger = {<Button icon  = 'undo alternate' primary 
              onClick = {() => setIsCreateCat(false)}/>} />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Form>
          <Form.Field>
            <Form.Input fluid label = 'Uusi kategooria:' placeholder = 'Uusi kategooria' name = 'kat'
              onChange = {({ target }) => setNewCat(target.value)}/>
          </Form.Field>
        </Form>
      </div>
    )
  }
  else if (isEditCat) {
    return (
      <EditCategory 
        setEdit = {setIsEditCat}
        id = {categoryId}
        name = {categoryName}
        updateCategory = {props.updateCategory}
      />
    )
  }
  return ( 
    <div>
      <Menu stackable size = 'huge' inverted color = 'grey' position = 'right'>
        <Menu.Item>
          <h3>Kategoria</h3>
        </Menu.Item>
        <Menu.Menu position = 'right'>
          <Menu.Item>
            <Popup content = 'lisää uusi katekoria' trigger = {<Button icon  = 'plus' primary
            onClick = {() => openCat()}/>} />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <h3>Kategorian lista</h3>
      {props.msg &&
        <Message 
          success
          header = 'Success!'
          content = {props.msg}
        />}
      {props.errMsg &&
        <Message 
          error
          header = 'Error!'
          content = {props.errMsg}
        />}
      <Table celled selectable unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Kategoria</Table.HeaderCell>
            <Table.HeaderCell textAlign = 'right'>Muokka</Table.HeaderCell>
          </Table.Row>          
        </Table.Header>
        <Table.Body>
            {props.category.map(cat => 
            <Table.Row key = {cat.id}>
              <Table.Cell>{cat.name}</Table.Cell>
              <Table.Cell textAlign = 'right'>
                <Popup content = 'Toiminta' trigger = {<Button icon = 'pencil alternate' primary
                  onClick = {() => openEditCat(cat)} />} />
              </Table.Cell>
            </Table.Row> )}
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isNewCat: state.isNewCat,
    category: state.category,
    msg: state.message,
    errMsg: state.errorMessage
  }
}

const mapDispatchToProps = {
  //openNewCat,
  createCategory,
  updateCategory,
  message, 
  errorMessage
}

//export default Category
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)