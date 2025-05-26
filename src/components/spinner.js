import React, { Component } from 'react'
import loading from './loading.gif'

export default class spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <div className="container my-3">
          <img src={loading} alt="" />
        </div>
      </div>
    )
  }
}
