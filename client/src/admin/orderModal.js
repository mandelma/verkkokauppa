import React, { useState } from 'react'
import { Table, Item, Button, Image, Header, Modal } from 'semantic-ui-react'
import order from '../services/order'

const OrderModal = (props) => {

  const { dimmer } = props.openModal
  
  const totalPrice = (data) => {
    let inx = 0
    data.map(item => inx += item)
    return inx
  }

  const tilausNumero = (tilaus) => {
    return tilaus.id.substring(0, 5)
  }
  console.log('orderdata id', props.orderData._id)
  return (
    <div>
      
      <Modal  dimmer = {dimmer} open={props.openModal.open} onClose={props.close}>
        
        <Modal.Header>Tilaus: {tilausNumero(props.orderData)} / asiakas: {props.orderData.user}</Modal.Header> 
        <Modal.Content>
          {/* <Image
            wrapped
            size = 'medium'
            src = {orderData.image[0]}
            /> */}
         
         
          {/* {orderData.image.map(img => 
            <Image
            wrapped
            size='tiny'
            src= {img}
          />)} */}

          <Image.Group size = 'tiny'>
            {props.orderData.image.map(img => 
              <Image key = {img} src = {img} />)}
          </Image.Group>
          
          <Modal.Description>
            
            <Header>Tilauksen tiedot: {}</Header>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Tuote</Table.HeaderCell>
                  <Table.HeaderCell>määrä</Table.HeaderCell>
                  <Table.HeaderCell>Kpl hinta</Table.HeaderCell>
                  <Table.HeaderCell>Hinta yhteensä</Table.HeaderCell>
                  <Table.HeaderCell>Tilaus yhteensä</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    {props.orderData.product.map(item => 
                      <p key = {item}>{item}</p>)}
                  </Table.Cell>
                  <Table.Cell>
                    {props.orderData.count.map((item, i) => 
                      <p key = {item + i}>{item}</p>)}
                  </Table.Cell>
                  <Table.Cell>
                    {props.orderData.productPrice.map(item => 
                      <p key = {item}>{item} euroa</p>)}
                  </Table.Cell>
                  <Table.Cell>
                    {props.orderData.productTotalPrice.map(item => 
                      <p key = {item}>{item} euroa</p>)}
                  </Table.Cell>
                  <Table.Cell>
                    {totalPrice(props.orderData.productTotalPrice)} euroa
                  </Table.Cell>
                </Table.Row>
                  
              </Table.Body>
            </Table>

            <p>Tilauksen pvm: {props.orderData.date}</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            icon='checkmark'
            labelPosition='right'
            content = 'Poistu'
            onClick={props.close}
          />
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default OrderModal