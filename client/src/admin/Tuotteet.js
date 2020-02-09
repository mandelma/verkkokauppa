import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Popup, Menu, Icon} from 'semantic-ui-react'
import LisaaTuotteet from './LisaaTuotteet'


const Product = (props) => {
  const [isAddProduct, setIsAddProduct] = useState(false)
  const [isEditProduct, setIsEditProduct] = useState(false)
  const [productData, setproductData] = useState([])

  const editProduct = (product) => {
    setproductData(product)
    setIsEditProduct(true)
  }

  console.log('products: ', props.products)

  if (isAddProduct) {
    return (
     <div>
       <LisaaTuotteet />
     </div>
    )
  }
  else if (isEditProduct) {
    return (
      <div>
        Edit product
      </div>
    )
  }
  return (
    <div>
      <Menu stackable size = 'huge' inverted color = 'grey' position = 'right'>
        <Menu.Item>
          <h3>Tuotteet</h3>
        </Menu.Item>
        <Menu.Menu position = 'right'>
          <Popup content = 'lisää uusi tuote' trigger = {<Button icon  = 'plus' primary
            onClick = {() => setIsAddProduct(true)}/>} />
        </Menu.Menu>
      </Menu>
      <h3>Tuotteiden lista</h3>
      <Table celled selectable unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign = 'center'>Kuva</Table.HeaderCell>
            <Table.HeaderCell textAlign = 'center'>Tuote</Table.HeaderCell>
            <Table.HeaderCell textAlign = 'center'>Hinta</Table.HeaderCell>
            <Table.HeaderCell textAlign = 'center'>Määrä</Table.HeaderCell>
            <Table.HeaderCell textAlign = 'right'>Muokka</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.products.map(product => 
            <Table.Row key = {product.id}>
              <Table.Cell textAlign = 'center'><img style = {{width: '50px', border: 'solid grey'}} 
                 src = {product.image.productImg}></img>
              </Table.Cell>
              <Table.Cell textAlign = 'center'>{product.name}</Table.Cell>
              <Table.Cell textAlign = 'center'>{product.price}</Table.Cell>
              <Table.Cell textAlign = 'center'>{product.count}</Table.Cell>
              <Table.Cell textAlign = 'right'>
              <Popup content = 'Toiminta' trigger = {<Button icon = 'pencil alternate' primary 
                onClick ={() => editProduct(product)}/>} />
              </Table.Cell>
            </Table.Row>
          )}
             
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
    products: state.product
  }
}

const mapDispatchToProps = {

}

export default connect(
  mapStateToProps
)(Product)