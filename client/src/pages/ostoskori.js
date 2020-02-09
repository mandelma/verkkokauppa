import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Popup, Label, Icon, Input, Message, Select, Form, Item} from 'semantic-ui-react'
import { removeItem, updateCartItem, delAllCart } from '../reducers/cartReducer'
import { message } from '../reducers/message/messageReduser'
import { createOrder } from '../reducers/orderReducer'
import { setOrder } from '../reducers/orderDataReducer'
import Footer from './footer'

const Ostoskori = (props) => {
  const [isPlusItem, setIsPlusItem] = useState(false)
  const [isOrdered, setIsOrdered] = useState(false)
  const [disableTable, setDisableTable] = useState(false)
  let [price, setPrice] = useState(null)
  let [productCount, setProductCount] = useState(true)

  /* let [orderData, setOrderData] = useState({
    productId: [],
    product: [],
    productPrice: [],
    productTotalPrice: [],
    productCount: [],
    image: []
  }) */

  console.log('cart in cart:', props.cart)

  const removeCartItem = (id) => {
    console.log('item id is', id)
    props.removeItem(id)
  }

  console.log('orderData in order', props.orderData)

  const increaseItemCount = (item) => {
    const newItemObject = {
      image: item.image,
      productName: item.productName,
      productPrice: item.productPrice + item.defPrice,
      productCount: item.productCount - 1,
      productCartCount: item.productCartCount + 1
    }
    if (item.productCount > 0) {
      props.updateCartItem(item._id, newItemObject)
    }
  }

  const decreaseItemCount = (item) => {
    const newItemObj = {
      image: item.image,
      productName: item.productName,
      productPrice: item.productPrice - item.defPrice,
      productCount: item.productCount + 1,
      productCartCount: item.productCartCount - 1
    }
    if (item.productCartCount > 1) {
      props.updateCartItem(item._id, newItemObj)
    }
  }

  const orderProducts = () => {
    //props.cart.map(item => props.setOrder(item))
    //props.setOrder()
    props.setOrder(props.cart)
    /* props.cart.map(item => {
      setOrderData({
        productId: [...orderData.productId, item._id],
        product: [...orderData.product, item.productName],
        productPrice: [...orderData.productPrice, item.defPrice],
        productTotalPrice: [...orderData.productTotalPrice, item.productPrice],
        productCount: [...orderData.productCount, item.productCartCount],
        image: [...orderData.image, item.image]
      })
    }) */
    setIsOrdered(true)
    setDisableTable(true)
  }

  const maksaa = () => {
    console.log('maksaa tuotteista')
    const date = new Date()
    const reducer = (acu, item) => acu + item
    
    try {
      const newOrder = {
        user: 'marman',
        date: date.toDateString(),
        productId: props.orderData.productId,
        product: props.orderData.product,
        productPrice: props.orderData.productPrice,
        productTotalPrice: props.orderData.productTotalPrice,
        count: props.orderData.productCount,
        image: props.orderData.image
      }

      props.createOrder(newOrder)
      setIsOrdered(false)
      props.delAllCart()
      props.message('Tuote on ostettu onnistuneesti!', 5)

    } catch (err) {
      console.log('Error:', err)
    }

  }

  const poistaTilaus = () => {
    props.delAllCart()
    setIsOrdered(false)
  }

  return (
    <div>
      <section>
        <div id = "container">
          {props.cart.length > 0 ?
          <h2 style = {{textAlign: 'center'}}>Ostoskori</h2> :
          <h2 style = {{textAlign: 'center'}}>Ostoskori on tyhjä</h2>}
            {props.msg &&
              <Message
                success
                header = 'Kiitos ostostasi!'
                content = {props.msg}
              />}
          <Table basic = 'very'>
            <Table.Body>
              {props.cart.map((item, i) =>
                <Table.Row key = {item._id} disabled = {disableTable}>
                  <Table.Cell ><img style = {{width: '100px'}} src = {item.image}></img></Table.Cell>
                  <Table.Cell>
                    {item.productName}<br />
                    Saatavilla: 
                     
                    <Label circular color = {item.productCount > 0 ? 'green' : 'red'}>{item.productCount}</Label><br /> 
                      
                  </Table.Cell>
                  <Table.Cell>
                    <p>Hinta: <b style = {{color: 'blue'}}>{item.productPrice && (item.productPrice).toFixed(2)} euroa</b></p><br />
                    {item.productCartCount > 1 
                      ?
                      <Button icon = 'minus' positive
                        onClick = {() => decreaseItemCount(item)}/>
                      : <Button icon = 'trash' color = 'red'
                        onClick = {() => removeCartItem(item._id)}/>}

                    <Label size = 'large' color = 'grey'>
                      Määrä
                      <Label.Detail>{item.productCartCount}</Label.Detail>
                      
                    </Label>

                    <Button icon = 'plus' positive
                      
                      onClick = {() => increaseItemCount(item)}
                    />
                   
                  </Table.Cell>
                </Table.Row>  )}
              <Table.Row>
                
              </Table.Row>
            </Table.Body>
          </Table>
          {props.cart.length > 0 && !isOrdered &&
          
          <Button fluid positive
            onClick = {() => orderProducts()}>Tilaa tuotteet</Button>}

        </div>
        <aside>
          
          {isOrdered && 
            <div>
              <h3 style = {{textAlign: 'center'}}>Tilaus suoritettu, Kiitos! <br />Siirry maksamaan...</h3>
              <p>Tuotteet yhteensä: {price} euroa</p>  
              <Button fluid positive
                onClick = {() => maksaa()}>Maksaa tuotteista</Button><br />
              <Button fluid negative
                onClick = {() => poistaTilaus()}>Keskeytä tilaus</Button>
            </div>
          }
        </aside>
      </section>
      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    products: state.product,
    cart: state.cart,
    user: state.user,
    msg: state.message,
    orderData: state.orderData
  }
}

const mapDispatchToProps = {
  removeItem,
  updateCartItem,
  delAllCart,
  createOrder,
  message, 
  setOrder
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (Ostoskori)