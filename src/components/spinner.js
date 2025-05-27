import React, { Component } from 'react'
import loading from './loading.gif'

const spinner = (props) => {
    return (
      <>
        <div className="text-center">
          <div className="container my-3">
            <img src={loading} alt="" />
          </div>
        </div>
      </>
    )
}

export default spinner