import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeImages } from '../reducers/imageReducer'
import NavBar from './navbar'
import Footer from './footer'

import productService from '../services/product'


const Etusivu = (props) => {
  return (
    <div>
      <section>
        <div id = 'container'>
          <h2>Etusivu</h2>
          <p>testi</p>
          {props.image.map((pic, i) => 
            <div key = {pic + i}>
              <img  style = {{width: '50px', border: 'solid grey'}} 
              src = {pic.productImg}></img>
            </div>)}

        </div>
        <aside>

        </aside>
      </section>
      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
    products: state.product,
    image: state.image
  }
}

const mapDispatchToProps = {
  initializeImages
}

export default connect(
  mapStateToProps
)(Etusivu)