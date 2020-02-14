import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Table, Item, Button, Header, Modal } from 'semantic-ui-react'
import OrderModal from './orderModal'

const AdminEtusivu = (props) => {
  const tilausNumero = (tilaus) => {
    return tilaus._id.substring(0, 5)
  }

  const [openModal, setOpenModal] = useState({
    open: false,
  })

  const [orderData, setOrderData] = useState({})

  const close = () => setOpenModal({ open: false })

  const show = (dimmer, order) => () => {
    setOpenModal({ dimmer, open: true })
    console.log('order product: ', orderData.product)
    setOrderData({
      productId: order.productId,
      product: order.product,
      productTotalPrice: order.productTotalPrice,
      productPrice: order.productPrice,
      count: order.count,
      image: order.image,
      id: order._id,
      user: order.user,
      date: order.date
    })
  }

  console.log('order data in admin', orderData)
  return (
    <div>
      <div className = 'adminMainLeft'>
        <h3 style = {{textAlign: 'center'}}>Tilaukset</h3>
        <Table basic = 'very'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nro</Table.HeaderCell>
              <Table.HeaderCell>Tilaus</Table.HeaderCell>
              <Table.HeaderCell>Pvm</Table.HeaderCell>
              <Table.HeaderCell>Tilaaja</Table.HeaderCell>
              <Table.HeaderCell>Tiedot</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          
          <Table.Body>
            {props.order.map((item, i) => 
            <Table.Row key = {item._id}>
              <Table.Cell>{i + 1}</Table.Cell>
              <Table.Cell>{tilausNumero(item)}</Table.Cell>
              <Table.Cell>{item.date}</Table.Cell>
              <Table.Cell>{item.user}</Table.Cell>
              <Table.Cell><Button positive onClick = {show('inverted', item)}>Open</Button></Table.Cell>
            </Table.Row> )}
          </Table.Body>
        </Table>
        
        {openModal.open &&
          <OrderModal 
            openModal = {openModal}
            close = {close}
            orderData = {orderData}
          />
         }



      </div>
      <div className = 'adminMainRight'>
        <h3 style = {{textAlign: 'center'}}>Rekisteröidyt asiakkaat</h3>
        <Table basic = 'very'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nro</Table.HeaderCell>
              <Table.HeaderCell>Nimi</Table.HeaderCell>
              <Table.HeaderCell>Käyttäjätunnus</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.user.map((item, i) => 
            <Table.Row key = {item.id}>
              <Table.Cell>{i + 1}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.username}</Table.Cell>
            </Table.Row> )}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    order: state.order,
    orderData: state.orderData,
    user: state.user
  }
}

export default connect(
  mapStateToProps
)(AdminEtusivu)