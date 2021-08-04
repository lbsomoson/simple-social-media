import React from 'react'

class SendButton extends React.Component {
  constructor(props) {
    super(props)

		this.sendRequest = this.sendRequest.bind(this);
  }

  sendRequest(e){
		e.preventDefault()

		const add = {
			userID: this.props.userid,
			friendID: this.props.data
		}
		
		//sends POST request to add friend a user
		fetch("http://localhost:3001/add-friend",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(add)
		})
		.then(response => response.json())
		.then(body => {
			if(body.success){
				alert("You have sent a friend request to " + this.props.name)
			}
		})
	}

  render(){
    return(
      <button id="add-btn" onClick={this.sendRequest}>Add Friend</button>
    )
  }

}

export default SendButton