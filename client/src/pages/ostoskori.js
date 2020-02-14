import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Popup, Label, Icon, Input, Message, Select, Form, Item} from 'semantic-ui-react'
import { removeItem, updateCartItem, delAllCart } from '../reducers/cartReducer'
import { message } from '../reducers/message/messageReduser'
import { createOrder } from '../reducers/orderReducer'
import { setOrder } from '../reducers/orderDataReducer'
import { editProduct } from '../reducers/productReducer'
import Footer from './footer'

const Ostoskori = (props) => {
  const [isOrdered, setIsOrdered] = useState(false)
  const [disableTable, setDisableTable] = useState(false)
  let [price, setPrice] = useState(null)
  const [newItems, setNewItems] = useState(null)

  const removeCartItem = (id) => {
    props.removeItem(id)
  }

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
      setNewItems(newItemObject)
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
      setNewItems(newItemObj)
    }
  }

  const orderProducts = () => {
    props.setOrder(props.cart)

    setIsOrdered(true)
    setDisableTable(true)
  }

  const data = props.orderData
  for (let i = 0; i < data.productId.length; i++) {
    const product = {
      name: data.product[i],
      price: data.productPrice[i],
      count: data.productCount[i],
      id: data.productId[i]
    }

    console.log('product', product)
  }

  const maksaa = () => {
    const date = new Date()
    try {
      const newOrder = {
        user: props.logInUser.username,
        date: date.toDateString(),
        cartId: props.orderData.cartId,
        product: props.orderData.product,
        productPrice: props.orderData.productPrice,
        productTotalPrice: props.orderData.productTotalPrice,
        count: props.orderData.productCartCount,
        image: props.orderData.image
      }

      props.createOrder(newOrder)
      setIsOrdered(false)
      props.delAllCart()
      props.message('Tuote on ostettu onnistuneesti!', 5)

    } catch (err) {
      console.log('Error:', err)
    }

    const data = props.orderData

    for (let i = 0; i < data.productId.length; i++) {
      const product = {
        name: data.product[i],
        price: data.productPrice[i],
        count: data.productCount[i]
      }
      try {
        props.editProduct(data.productId[i], product)
      } catch (err) {
        console.log('Error:', err)
      }
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
              {props.cart.map((item, i) => item.productName !== 'Kotisiivous palvelu' ?
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
                </Table.Row> 
                 :
                <Table.Row key = {item._id} disabled = {disableTable}>
                  <Table.Cell>
                    <img style = {{width: '100px'}} src = {item.image}></img>
                  </Table.Cell>
                  <Table.Cell>
                    {item.productName}
                  </Table.Cell>
                  <Table.Cell>
                    <p>Hinta: <b style = {{color: 'blue'}}>{item.productPrice} euroa</b></p>
                    
                    <Button icon = 'trash' color = 'red'
                        onClick = {() => removeCartItem(item._id)}/>
                    <Label size = 'large' color = 'grey'>
                      Määrä
                      <Label.Detail>{item.productCartCount} tuntia</Label.Detail>
                    </Label>
                  </Table.Cell>
                </Table.Row> )}
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

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.product,
    cart: state.cart,
    user: state.user,
    msg: state.message,
    orderData: state.orderData,
    image: state.image
  }
}

const mapDispatchToProps = {
  removeItem,
  updateCartItem,
  delAllCart,
  createOrder,
  message, 
  setOrder,
  editProduct
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (Ostoskori)