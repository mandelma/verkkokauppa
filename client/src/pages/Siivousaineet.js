import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router, Route, Link, Redirect
} from 'react-router-dom'
import { Table, Button, Popup, Menu, Icon, Message} from 'semantic-ui-react'
import Navbar from './navbar'
import Footer from './footer'
import { createItem } from '../reducers/cartReducer'
//import cartService from '../services/cartItemsList'
//import ImageZoom from 'react-medium-image-zoom'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


const Siivousaineet = (props) => {

  const [message, setMessage] = useState(false)

  const [categoryName, setCategoryName] = useState([])
  let catName = []
  
  /* products.forEach(element => {
    catName.push(element.category.category)
  }); */

  if (message) {
    setTimeout(() => {
      setMessage(false)
    }, 3000)
  }

  
  const addItem = async (id, productImage, name, price, count) => {
    
    const itemToCart = {
      username: 'Marina',
      image: productImage,
      productName: name,
      defPrice: price, 
      productPrice: price,
      productCount:  count - 1,
      //productCartCount: 1
    }

    props.createItem(id, itemToCart)


    //const addedItem = await cartService.create(id, itemToCart)
    //cartUpdate(addedItem)

    //setCartItems({...cartItems, list: [...cartItems.list, 1]})

    //setDefPrice({...defPrice, priceList: [...defPrice.priceList, price]})
    //setDefCount({...defCount, countList: [...defCount.countList, count]})

    /* setOrderInfo({
      productId: [...orderInfo.productId, id],
      productName: [...orderInfo.productName, name],
      productPrice: [...orderInfo.productPrice, price],
      productTotalPrice: [...orderInfo.productTotalPrice, price],
      productCount: [...orderInfo.productCount, 1],
      image: [...orderInfo.image, productImage]
    }) */

    //setMessage(true)
  }

 
  return (
    <div>
      <section className = 'productSection'>
      
        <div id = "productContainer" style = {{padding: '20px'}}>
        <h2 style = {{textAlign: 'center'}}>Siivousaineet</h2>
         
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
                    {/* <ImageZoom
                      image={{
                        src: product.image.productImg,
                        alt: 'Golden Gate Bridge',
                        className: 'img',
                        style: { width: '10em' }
                      }}
                      zoomImage={{
                        src: product.image.productImg,
                        alt: 'Golden Gate Bridge'
                      }}
                    /> */}
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

const mapStateToProps = (state) => {
  return {
    products: state.product,
    cart: state.cart
  }
}

const mapDispatchToProps = {
  createItem
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Siivousaineet)