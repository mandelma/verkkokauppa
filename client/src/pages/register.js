import React, { useState } from 'react'
import Footer from './footer'
import { Input, Button, Form } from 'semantic-ui-react'
import userService from '../services/users'


const Register = () => {
  const [etunimi, setEtunimi] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = (e) => {
    console.log('nimi', e.target.name.value)
    const newUser = {
      username: username,
      name: etunimi,
      password: password
    }
    try {
      if (newUser.username !== '' && newUser.name !== '') {
        //userService.createUser(newUser)
        //  .then(response => response.data)
        console.log('create new user', newUser)
      }else {
        console.log('error')
      }
    }catch (e) {
      console.log('Error: ', e)
    }
    e.target.name.value = ''
  }

  return (
    <div>
     

      <section>
        <div className='register'>
          <Form onSubmit = {handleRegister}>
            <Form.Group widths = 'equal'>
              <Form.Input label = 'Name' placeholder = 'name' name = 'name'
                onChange = {({ target }) => setEtunimi(target.value)}/>
              <Form.Field label = 'Sex' control = 'select'>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </Form.Field>
            </Form.Group>
            <Form.Group widths = 'equal' >

              <Form.Field required>
                <label>Username:</label>
                <Input placeholder = 'username'
                  onChange = {({ target }) => setUsername(target.value)} />
              </Form.Field>
              <Form.Field required>
                <label>Password:</label>
                <Input placeholder = 'password'
                 onChange = {({ target }) => setPassword(target.value)}/> 
              </Form.Field>
            </Form.Group>
            
            <Button className = 'ui grey button' control='button' type = 'submit'>
              Luo asiakkuus
            </Button>
          </Form>

        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Register