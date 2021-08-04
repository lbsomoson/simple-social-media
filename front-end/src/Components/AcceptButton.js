import React from 'react'

class AcceptButton extends React.Component {
  constructor(props) {
    super(props)

    this.acceptRequest = this.acceptRequest.bind(this);
  }

  acceptRequest(e) {
    e.preventDefault();
    
    const accept = {
			userID: this.props.userid,
			friendID: this.props.data
		}
		
		//sends POST request to accept the friend request 
		fetch("http://localhost:3001/accept-friend",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(accept)
		})
		.then(response => response.json())
		.then(body => {
			if(body.success){
				alert("You are now friends with " + this.props.name)
			}
			else {
				alert("Accept friend request failed.")
			}
		})

  }

  render() {
    return (
      <button id="accept-btn" onClick={this.acceptRequest}>Accept</button>
    )
  }
}

export default AcceptButton