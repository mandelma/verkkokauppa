import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Table, Form, Radio } from 'semantic-ui-react'
import { createService, delAllCart } from '../reducers/cartReducer'
//import { createOrder } from '../reducers/orderReducer'
//import cartService from '../services/cartItemsList'



const LaskeSiivousHinta = (props) => {
  const [etunimi, setEtunimi] = useState('')
  const [sukunimi, setSukunimi] = useState('')
  const [osoite, setOsoite] = useState('')
  const [kaupunki, setKaupunki] = useState('')
  const [sahkoposti, setSahkoposti] = useState('')
  const [pintaala, setPintaala] = useState('')
  const [tulos, setTulos] = useState(false)
  const [hinta, setHinta] = useState(0)
  const [tunti, setTunti] = useState(0)
  const [tuntiHinta, setTuntiHinta] = useState(0)
  //let [totalPrice, setTotalPrice] = useState(0)

  const [siivousAika, setSiivousAika] = useState({})
 
  const [tiedot, setTiedot] = useState([])

  let price = 0
  let priceExtraMatot = 0
  let priceExtraRoska = 0
  let totalPrice = 0


  const getResult = (e) => {
    setTulos(true)

    

    if (siivousAika === 'make') {
      price = 40.00
      setTuntiHinta(40.00)
    }else if (siivousAika === 'tope') {
      price = 43.00
      setTuntiHinta(43.00)
    }

    if(e.target.matot.checked) {
      console.log('matot: ', e.target.matot.value)
      setTiedot(tiedot.concat(e.target.matot.value))
      priceExtraMatot = 30.00
    }
      
    if(e.target.roska.checked) {
      console.log('roska: ', e.target.roska.value)
      setTiedot(tiedot.concat(e.target.roska.value))
      priceExtraRoska = 20.00
    }

    if (pintaala === '0 - 50 m²') {
      //setTotalPrice(tuntiHinta * 2)
      totalPrice = price * 2
      setTunti(2)
    } else if (pintaala === '50 - 100 m²') {
      //setTotalPrice(tuntiHinta * 3)
      totalPrice = price * 3
      setTunti(3)
    }else if (pintaala === '100 - 150 m²') {
      //setTotalPrice(tuntiHinta * 4)
      totalPrice = price * 4
      setTunti(4)
    }else if (pintaala === '150 - 200 m²') {
      //setTotalPrice(tuntiHinta * 5)
      totalPrice = price  * 5
      setTunti(5)
    }

    console.log('extra matot hinta', priceExtraMatot)
    

    //setTotalPrice(totalPrice + priceExtraMatot + priceExtraRoska)
    setHinta(totalPrice + priceExtraMatot + priceExtraRoska)
    e.target.reset()
  }

  console.log('hinta' , hinta)
  console.log('tuntimäärä', tunti)

  const aikaa = (sAika) => {
    if (sAika === 'make') {
      return <p>maanantai - keskiviikko</p>
    }
    return <p>torstai - perjantai</p>
  }

  const clearFields = () => {
    document.getElementById('sForm').reset()
  }

  const tilaaSiivous = async () => {
    
    console.log('totalPrice', totalPrice)
    try {
      const newCartItem = {
        username: props.logInUser.username,
        name: 'Kotisiivous palvelu',
        count: 1,
        tuntiHinta: tuntiHinta,
        tuntiMaara: tunti,
        price: hinta,
      }

      props.createService(newCartItem)
      //props.createOrder()
      //props.delAllCart()
      setTulos(false)
    

      //const savedCartItem = await cartService.createSiivous(newCartItem)
      //console.log('saved cart siivous:', savedCartItem)
    } catch (err) {
      console.log('Error:', err)
    }
  }


  const poistuTilaaSiivous = () => {
    setTulos(false)
  }

    if (tulos) {
      return (
        <div>
          <h2>Hei {etunimi + ' ' + sukunimi}!</h2>
          <Table basic = 'very'>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Siivouksen kaupunki -</Table.Cell>
                <Table.Cell>{kaupunki}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Siivouksen osoite -</Table.Cell>
                <Table.Cell>{osoite}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Siivottava alue -</Table.Cell>
                <Table.Cell>{pintaala}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Siivouksen aikaa -</Table.Cell>
                <Table.Cell>{aikaa(siivousAika)}</Table.Cell>
              </Table.Row>
              
              <Table.Row>
                <Table.Cell style = {{fontWeight: 'bold'}}>Siivouksen hinta -</Table.Cell>
                <Table.Cell style = {{color: 'blue', fontWeight: 'bold'}}>{hinta} euroa</Table.Cell>
              </Table.Row>
            </Table.Body>
            
          </Table>
          <Button positive fluid onClick = {() => tilaaSiivous()}>Tilaa siivous</Button>
          <br></br>
          <Button primary fluid onClick = {() => poistuTilaaSiivous()}>Poistu</Button>
        </div>
      )
    }
  return (
    <div>
      <h2>Tarkista siivouksen hinta:</h2>
      <Form id = 'sForm' onSubmit = {getResult} >
        <Form.Field>
          


          <Form.Input fluid label = 'Etunimi' placeholder = 'etunimi' name = 'name' 
            onChange = {({ target }) => setEtunimi(target.value)}/> 


          <Form.Input fluid label = 'Sukunimi' placeholder = 'sukunimi'
            onChange = {({ target }) => setSukunimi(target.value)} />
        </Form.Field>
        <Form.Field>
          <Form.Input fluid label = 'osoite' placeholder = 'katu ja talo' 
            onChange = {({ target }) => setOsoite(target.value)}/>
          <Form.Input fluid label = 'Kaupunki' placeholder = 'kaupunki'
            onChange = {({ target }) => setKaupunki(target.value)} />
        </Form.Field>
        <Form.Field>
          <Form.Input fluid label = 'Sähköposti' placeholder = 'sähköposti'
           onChange = {({ target }) => setSahkoposti(target.value)} />
          <Form.Field label='Pintaala' control='select' name = 'pinta'
            onChange = {({ target }) => setPintaala(target.value)}>
            <option value='valitse'>Valitse pintaala</option>
            <option value='0 - 50 m²'>0 - 50</option>
            <option value='50 - 100 m²'>50 - 100</option>
            <option value='100 - 150 m²'>100 - 150</option>
            <option value='150 - 200 m²'>150 - 200</option>
          </Form.Field>
        </Form.Field>
        <p>Valitse siivous aika:</p>
        <Form.Group>
          <Form.Radio 
            label = 'Maanantai - keskiviikko'
            name = 'papa'
            value = 'mape'
            checked = {siivousAika === 'make'}
            onChange = {() => setSiivousAika('make')}
          />
          <Form.Radio 
            label = 'torstai - perjantai'
            name = 'papa'
            value = 'tope'
            checked = {siivousAika === 'tope'}
            onChange = {() => setSiivousAika('tope')}
          />
        </Form.Group>

        <Form.Group grouped>
          <label>Lisätiedot:</label>
          <Form.Field label='Mattojen tamppaus pihalla' control='input' 
            type='checkbox' name = 'matot' value = 'matot'/>
          <Form.Field label='Roskien ulosvienti' control='input' 
            type='checkbox' name = 'roska' value = 'roska'/>
        
        </Form.Group>       

          <Button positive fluid control='button' type = 'submit'>Laske siivouksen hinta</Button>          
        
      </Form><br></br>
      <Button primary fluid onClick = {() => clearFields()}>Tyhjennä kentat</Button>
  
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  //console.log('state in laskesiivoushinta: ', state)
  //console.log('ownProps in laskesiivoushinta: ', ownProps)
  return {

  }
}

const mapDispatchToProps = {
  createService,
  delAllCart
  //createOrder
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (LaskeSiivousHinta)