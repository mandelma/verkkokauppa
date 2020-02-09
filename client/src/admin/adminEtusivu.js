import React from 'react'
import { Table, Item, Button, Header, Modal } from 'semantic-ui-react'
//import OrderModal from './OrderModal'

const AdminEtusivu = () => {
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
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell><Button positive>Open</Button></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        
        {/* {openModal.open &&
          <OrderModal 
            openModal = {openModal}
            close = {close}
            orderData = {orderData}
            tilausNumero = {tilausNumero}
          />
         } */}



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
            
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default AdminEtusivu