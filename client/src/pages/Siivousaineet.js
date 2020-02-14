import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Popup, Menu, Icon, Message} from 'semantic-ui-react'
import Footer from './footer'
import { createItem } from '../reducers/cartReducer'
import { createInfoMessage } from '../reducers/message/infoMessageReducer'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


const Siivousaineet = (props) => {
  const addItem = async (id, productImage, name, price, count) => {
    if (count > 0) {
      const itemToCart = {
        username: props.logInUser.username,
        image: productImage,
        productName: name,
        defPrice: price, 
        productPrice: price,
        productCount:  count - 1,
      }
      props.createItem(id, itemToCart)
    }
    else {
      props.createInfoMessage('Valitettavasti ei saattavilla hetkellä', 3000)
    }
  }
    
  return (
    <div>
      <section className = 'productSection'>
      
        <div id = "productContainer" style = {{padding: '20px'}}>
        <h2 style = {{textAlign: 'center'}}>Siivousaineet</h2>
          {props.infoMessage &&
          <Message
            info
            header = 'Tuote loppuunmyyty'
            content = {props.infoMessage}
          /> }
          <Table celled selectable unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign = 'center'>Kuva</Table.HeaderCell>
                <Table.HeaderCell textAlign = 'center'>Tuote</Table.HeaderCell>
                <Table.HeaderCell textAlign = 'center'>Hinta</Table.HeaderCell>
                
                <Table.HeaderCell textAlign = 'right'>Katso</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {props.products.map(product => product.category.name === 'siivousaineet' &&
                <Table.Row key = {product.id}>
                  <Table.Cell>
                    <Zoom>
                      <img
                        alt="that wanaka tree"
                        src={product.image.productImg}
                        width="50"
                      />
                    </Zoom>
                  </Table.Cell>
                  <Table.Cell textAlign = 'center'>{product.name}</Table.Cell>
                  <Table.Cell textAlign = 'center'>{product.price}</Table.Cell>
                  <Table.Cell textAlign = 'center'>

                    <Popup content = 'Lisää tuote' trigger = {<Button icon = 'shopping cart'
                      positive onClick = {() => addItem(product.id, 
                        product.image.productImg,
                        product.name,
                        product.price,
                        product.count
                      )}>
                      </Button>} 
                    /> 
                  </Table.Cell>
                </Table.Row>
              )}
                
            </Table.Body>
          </Table>
        </div>
      </section>
      <Footer />

    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.product,
    cart: state.cart,
    infoMessage: state.infoMessage
  }
}

const mapDispatchToProps = {
  createItem,
  createInfoMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Siivousaineet)