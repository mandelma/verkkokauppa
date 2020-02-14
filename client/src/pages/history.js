import React from 'react'
import { connect } from 'react-redux'
import Footer from '../pages/footer'
import { Table } from 'semantic-ui-react'

const History = (props) => {
  const userIn = window.localStorage.getItem('loggedUser')

  const getTotalPrice = (product) => {
    let hintaYht = 0
    product.map(item => hintaYht += item)
    return hintaYht
  }

  return (
    <div>
      <section className = 'productSection'>

        <div id = "productContainer" style = {{padding: '20px'}}>
          <h2 style = {{textAlign: 'center'}}>Tilaukset:</h2>
          {props.order.map((item, i) => item.user === props.logInUser.username &&
          <Table key = {item._id} definition>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>{props.logInUser.name}</Table.HeaderCell>
                <Table.HeaderCell>Tuote</Table.HeaderCell>
                <Table.HeaderCell>Kuva</Table.HeaderCell>
                <Table.HeaderCell>Määrä</Table.HeaderCell>
                <Table.HeaderCell>Tuoten hinta</Table.HeaderCell>
                <Table.HeaderCell>Hinta yhteensä</Table.HeaderCell>
                <Table.HeaderCell>Pvm</Table.HeaderCell>
                <Table.HeaderCell>Tilauksen hinta</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row  >
                <Table.Cell width = {2}>Tilaus: {(item._id).substring(0, 5)}</Table.Cell>
                <Table.Cell>
                  <br />
                  {item.product.map((item, i) =>
                    <div key = {item}><p style = {{lineHeight: '200%'}}>{i + 1}.   {item}</p></div>)}<br />
                </Table.Cell>
                <Table.Cell>
                  <br />
                  {item.image.map(item =>
                  <div key = {item}><img style = {{width: '20px'}} src = {item}></img></div>)}<br />

                </Table.Cell>
                <Table.Cell>
                  <br />
                  {item.count.map((item, i) =>
                    <div key = {item + i} style = {{lineHeight: '200%'}}>{item}</div> )}<br />
                </Table.Cell>
                <Table.Cell>
                  <br />
                  {item.productPrice.map(item =>
                    
                    <div key = {item} style = {{lineHeight: '200%'}}>{item} euroa</div>)}<br />
                </Table.Cell>
                <Table.Cell>
                  <br />
                  {item.productTotalPrice.map(item =>
                    <div key = {item} style = {{lineHeight: '200%'}}>{(item.toFixed(2).length < 5 ? '0' + item.toFixed(2) : item.toFixed(2))} euroa</div> )}<br />
                </Table.Cell>
                <Table.Cell>
                  {item.date}
                </Table.Cell>
                <Table.Cell>
                    <h3 style = {{color: 'blue'}}>{getTotalPrice(item.productTotalPrice)} euroa</h3>
                </Table.Cell>
              </Table.Row> 
            </Table.Body> 
          </Table> )}
        </div>
      </section>
      <Footer />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  console.log('ownprops in mapStateToProps in history', ownProps)
  return {
    order: state.order,
    
    //userIn: state.userIn
  }
}

const mapDispatchTOProps = {

}

export default connect(
  mapStateToProps
) (History)
