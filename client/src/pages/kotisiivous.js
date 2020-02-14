import React from 'react'
import { connect } from 'react-redux'
import LaskeSiivousHinta from '../pages/laskeSiivousHinta'
import Footer from './footer'

const Kotisiivous = (props) => {
  return (
    <div>
      <section>
        <div id = "container">
          <h2>Kotisiivous sivu</h2>
          <h3 style = {{color: 'blue'}}>Siivous koskee</h3>
          <ul>
            <li>Pintojen puhdistus</li>
            <li>Pölyt pois</li>
            <li>Imurointi</li>
            <li>Lattioiden pesu</li>
          </ul>
        </div>
        <aside>
          <LaskeSiivousHinta logInUser = {props.logInUser}/>
        </aside>
      </section>
      <Footer />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  //console.log('own props in kotisiivous', ownProps)
  return {

  }
}

export default connect(
  mapStateToProps
) 
(Kotisiivous)