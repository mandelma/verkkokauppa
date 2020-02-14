import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Popup, Button, Menu, Form, Table } from 'semantic-ui-react'
//import productService from '../services/product'
import imageService from '../services/images'
import { editProduct, removeProduct } from '../reducers/productReducer'
import { removeImage } from '../reducers/imageReducer'


const MuokkaTuote = (props) => {
  const [selectProductId, setSelectProductId] = useState('')
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productCount, setProductCount] = useState('')
  const [productImage, setProductImage] = useState('')
  const [uploadedImgId, setUploadedImgId] = useState('')

  const updateImage = async () => {
    const data = new FormData()
    data.append('file', productImage)
    //console.log('imagedata:', data)
    //const imageUpdate = await imageService.update(productData.image._id, data)
    

    const newImage = await imageService.create(data)
    setUploadedImgId(newImage._id)
    //imageUp(imageUpdate)

    //props.setIsEditProduct(false)
  }

  console.log('product data for edit image', props.productData)

  const saveProduct = async () => {
    
    try {
      const editedProduct = {
        name: productName,
        price: productPrice,
        count: productCount,
        image: uploadedImgId
      }
      //console.log('product id: ', selectProductId)
      //console.log('product name:', productName)
      props.editProduct(props.productData.id, editedProduct)
      //const updatedProduct = await productService.update(productData.id, editedProduct)
      //productUp(productData.id, updatedProduct)
      props.setIsEditProduct(false)
    }catch (exception) {
      console.log('Error here: ', exception)
    }
  }

  const poistaTuote = async () => {
    //await productService.remove(productData.id)
    //delProduct(productData.id)
    props.removeProduct(props.productData.id)
    props.removeImage(props.productData.image._id)
    props.setIsEditProduct(false)
  }


  const canselEditProductPage = () => {
    props.setIsEditProduct(false)
  }

  return (
    <div>
      <Menu stackable size = 'huge' inverted color = 'grey' position = 'right'>
        <Menu.Item>
          <h3>Tuotteet</h3>
        </Menu.Item>
        <Menu.Menu position = 'right'>
          <Menu.Item>
            <Popup content = 'Tallenna muokkaus' trigger = {<Button icon  = 'save' positive 
            onClick = {() => saveProduct()}/>} />
          </Menu.Item>
          <Menu.Item>
            <Popup content = 'Keskeytä' trigger = {<Button icon  = 'undo alternate' primary 
            onClick = {() => canselEditProductPage()}/>} />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign = 'center'>Kuva</Table.HeaderCell>
            <Table.HeaderCell textAlign = 'center'>Tuote</Table.HeaderCell>
            <Table.HeaderCell textAlign = 'center'>Hinta</Table.HeaderCell>
            <Table.HeaderCell textAlign = 'center'>Määrä</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell textAlign = 'center'><img 
              style = {{width: '300px'}}  src = {props.productData.image.productImg}></img></Table.Cell>
            <Table.Cell textAlign = 'center'>{props.productData.name}</Table.Cell>
            <Table.Cell textAlign = 'center'>{props.productData.price}</Table.Cell>
            <Table.Cell textAlign = 'center'>{props.productData.count}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <h3 style = {{fontStyle: 'bold'}}>Muokka tuote</h3>
      <div style = {{color: 'blue'}}>
        
      </div><br></br>
      <Form>
        <Form.Field>
          <Form.Input fluid label = 'Tuotteen uusi nimi:' placeholder = 'tuotteen uusi nimi' name = 'tuote'
            onChange = {({ target }) => setProductName(target.value)}/>
        </Form.Field>
        <Form.Field>
          <Form.Input fluid label = 'Tuotteen uusi hinta:' placeholder = 'tuotteen uusi hinta' name = 'hinta'
           onChange = {({ target }) => setProductPrice(target.value)} />
        </Form.Field>
        <Form.Field>
          <Form.Input fluid label = 'Tuotteen uusi määrä:' placeholder = 'tuotteen uusi määrä' name = 'maara'
            onChange = {({ target }) => setProductCount(target.value)} />
        </Form.Field>
        <Form.Field>
          <Form.Input fluid label = 'Tuotteen uusi kuva:' name = 'kuva' type = 'file'
            onChange = {({ target }) => setProductImage(target.files[0])} />
            {productImage  &&
              <Button positive onClick = {() => updateImage()}>
                Upload
              </Button>}
        </Form.Field>
        <Button fluid color = 'red'
          onClick = {() => poistaTuote() }>
           Poista tuote tietokannasta
        </Button>
      </Form>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  console.log('ownProps in muokkaTuote', ownProps)
  return {

  }
}

const mapDispatchToProps = {
  editProduct,
  removeProduct,
  removeImage
}

export default connect(
  null,
  //mapStateToProps,
  mapDispatchToProps
) (MuokkaTuote)