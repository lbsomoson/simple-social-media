import React from 'react'
import Header from '../Components/Header.js'
const queryString = require('query-string')

class UserProfile extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      id: queryString.parse(props.location.search).id,
      firstName: "",
      lastName: "",
      email: ""
    }

  }

  componentDidMount(){
    fetch(
      "http://localhost:3001/user-profile", 
      {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id: this.state.id})
		})
		.then(response => response.json())
		.then(body => {
      //sets the state with the info of a user
      if(body.success){
        this.setState({
          firstName: body.user.firstName,
          lastName: body.user.lastName,
          email: body.user.email
        })
      } else {
        alert("Unable to view user profile.")
      }
      
		})
  }

  render() {
    return (
      <div>
        <div className="user-profile">
          <div id="user-name">{this.state.firstName} {this.state.lastName}</div>
          <div id="user-email">{this.state.email}</div>
        </div>
        <Header />
      </div>
      
    )
  }
}

export default UserProfile