import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './css/signUp.css'

export default class SignUp extends Component {
  render() {
    return (
      <div className = "signUp">
        <div className="header">
          <h1>Welcome!</h1>
          <h2>Sign Up Here</h2>
        </div>
        <div className="card-container">
          <div className="card">
            <input type="text" placeholder="Enter your first name"></input>
            <input type="text" placeholder="Enter your last name"></input>
            <input type="text" placeholder="Enter your email"></input>
            <input type="password" placeholder="Enter your password"></input>
            <input type="password" placeholder="Confirm your password"></input>
            <button>Sign Up</button>
            <p> Already have an account?<span><Link to="/">Login</Link></span></p>
          </div>
        </div>
      </div>
    )
  }
}
