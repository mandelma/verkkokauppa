import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Icon, Popup, Button, Menu, Table, Form, Select } from 'semantic-ui-react'
//import { FileInput } from 'react-md'
//import 'react-md/src/scss/_react-md.scss'
//import axios from 'axios'
import categoryService from '../services/category'
import imageService from '../services/images'
import { createImage, addImage } from '../reducers/imageReducer'
import { addNewProduct } from '../reducers/productReducer'
//import './inputFile.css'


const LisaaTuotteet = (props) => {
  // new product name, price, count input
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productCount, setProductCount] = useState('')
  const [saveButton, setSaveButton] = useState(false)
  
  const [selectCategoryId, setSelectCategoryId] = useState('')

  const [addFile, setAddFile] = useState(null)
  const [imgData, setImgData] = useState([])
  const [showImage, setShowImage] = useState(null)
  const [removeButton, setRemoveButton] = useState(false)
  const [imageSent, setImageSent] = useState(false)

  const onChangeHandler = event => {
    
    try {
      console.log(event.target.files[0])
      const files = event.target.files[0]
      console.log('event value ', event.target.value)

      setShowImage(URL.createObjectURL(files))

      setAddFile(event.target.files[0])
    

    } catch (err) {
      console.log('Error:', err)
    }
    
    setRemoveButton(true)
  
  }



  if (addFile) {
  }
  
  

  const saveNewProduct = async () => {
    
    try {
      const newProduct = {
        name: productName,
        price: productPrice,
        count: productCount,
        image: imgData.imgCreated._id
      }      
      
      //const result = await categoryService.addProduct(selectCategoryId, newProduct)
      //createProduct(result)
      props.addNewProduct(selectCategoryId, newProduct)


      //props.addImage(imgData.imgCreated)

      console.log('image data for update image', imgData.imgCreated)
      //console.log('image id', imgData.imgCreated._id)
    }catch (exception) {
      console.log('Error: ', exception)
    }
    //setProductName('')
    props.setIsAddProduct(false)
  }

  const addImage = async () => {
    const data = new FormData()
    data.append('file', addFile)
    const imageUpdate = await imageService.create(data)
    
    setImgData(imageUpdate)
    //imageUp(imageUpdate)
    setSaveButton(true)
  
    //removeImage()
    setImageSent(true)
  }

  console.log('products in lisaa tuotteet', props.product)

  const removeImage = () => {
    setShowImage(null)
    setRemoveButton(false)
    document.getElementById('kuva').reset()
  }

  const canselNewTuote = () => {
    props.setIsAddProduct(false)
  }

  //console.log('result: ', imgFile)


  return (
    <div>
      <Menu stackable size = 'huge' inverted color = 'grey' position = 'right'>
        <Menu.Item>
          <h3>Tuotteet</h3>
        </Menu.Item>
        <Menu.Menu position = 'right'>
          <Menu.Item>
            {saveButton &&
              <Popup content = 'Tallenna uusi tuote' trigger = {<Button icon  = 'save' positive 
                onClick = {() => saveNewProduct()}/>} />
            }
          </Menu.Item>
          <Menu.Item>
            <Popup content = 'Keskeytä' trigger = {<Button icon  = 'undo alternate' primary 
            onClick = {() => canselNewTuote()}/>} />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <h3>Lisää tuote</h3>
      <Form id = 'kuva'>
        <Form.Field control='select' name = 'cat'
          onClick = {({ target }) => setSelectCategoryId(target.value)}>
          <option value='valitse'>Valitse kategoria</option>
          {props.category.map(cat => 
            <option key = {cat.id} value = {cat.id}>{cat.name}</option>
            )}
        </Form.Field>
        <Form.Field>
          <Form.Input fluid label = 'Tuotteen nimi:' placeholder = 'tuotteen nimi' name = 'tuote'
            onChange = {({ target }) => setProductName(target.value)}/>
        </Form.Field>
        <Form.Field>
          <Form.Input fluid label = 'Tuotteen hinta:' placeholder = 'tuotteen hinta' name = 'hinta'
           onChange = {({ target }) => setProductPrice(target.value)} />
        </Form.Field>
        <Form.Field>
          <Form.Input fluid label = 'Tuotteen määrä:' placeholder = 'tuotteen määrä' name = 'maara'
            onChange = {({ target }) => setProductCount(target.value)} />
        </Form.Field>
        <Form.Field>
          <p>Lisää kuva:</p>
          <Table celled unstackable>
            
            <Table.Body>
                <Table.Row >
                  <Table.Cell style = {{width: '50%'}}>
                    <Form.Field>
                      {!imageSent 
                      ?
                      <Form.Input type = 'file' style = {{height: '100px'}} 
                        onChange = {onChangeHandler} name = 'file'
                      /> : <h3>Image uploaded successfully!</h3>
                      }
                      
                      {removeButton && !imageSent
                      &&                        
                      <Form.Input>
                        <Button style = {{}} 
                            primary onClick = {() => removeImage()}>
                              Remove image
                        </Button>
                        <Button positive style = {{marginLeft: '20px'}}
                          onClick = {() => addImage()}>
                            Upload image
                        </Button>
                      </Form.Input>}
                    </Form.Field>
                    
                  </Table.Cell>
                  <Table.Cell>
                    <img style = {{width: '200px'}}src = {showImage}></img>
                  </Table.Cell>
                </Table.Row>      
            </Table.Body>
          </Table>
        </Form.Field>
      </Form>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    category: state.category,
    product: state.product
  }
}

const mapDispatchToProps = {
  addNewProduct,
  createImage,
  addImage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(LisaaTuotteet)
  