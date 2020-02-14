import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Popup, Menu, Input, Icon} from 'semantic-ui-react'
import LisaaTuotteet from './LisaaTuotteet'
import MuokkaTuote from './muokkaTuote'

const initialState = {
  search: '',
  isLoading: false
}

const Product = (props) => {
  const [isAddProduct, setIsAddProduct] = useState(false)
  const [isEditProduct, setIsEditProduct] = useState(false)
  const [productData, setproductData] = useState([])
  const [state, setState] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [filterLen, setFilterLen] = useState(0)

  const editProduct = (product) => {
    setproductData(product)
    setIsEditProduct(true)
  }
  
  // product search by product name
  const filterSearch = props.products.filter(product => {
    return product.name.toLowerCase().indexOf(state.search) !== -1
  })

  const changeSearch = (searchValue, filterLen) => {
    const temp = searchValue
    setFilterLen(filterSearch.length)
    console.log('temp len is', temp.length)
    console.log('lilter search len inside function now:', filterLen)
    if (temp.length < 1 || filterSearch.length > 0) {
      setState({search: searchValue.substring(0, 20), isLoading: false})
    }
    else {
      setState({search: searchValue.substring(0, 20), isLoading: true})
    }
    
  }

  
  //console.log('filterLen', filterLen)
  console.log('lilter search:', filterSearch.length)
  console.log('state isLoading:', isLoading)

  if (isAddProduct) {
    return (
     <div>
       <LisaaTuotteet 
        setIsAddProduct = {setIsAddProduct}
       />
     </div>
    )
  }
  else if (isEditProduct) {
    return (
      <div>
        <MuokkaTuote 
          productData = {productData}
          setIsEditProduct = {setIsEditProduct}
        />
      </div>
    )
  }
  return (
    <div>
      <Menu stackable size = 'huge' inverted color = 'grey' position = 'right'>
        <Menu.Item>
          <h3>Tuotteet</h3>
        </Menu.Item>
        <Menu.Item>
          <Input
            type = 'text'
            icon = 'search'
            //loading icon = 'user'
            loading = {state.isLoading}
            placeholder = 'Etsi tuoten nimellä...' 
            value = {state.search}
            onChange = {({ target }) => changeSearch(target.value, filterSearch.length)}
          />
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
          {filterSearch.map(product => 
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