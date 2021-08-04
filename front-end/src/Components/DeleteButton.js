import React from 'react'

class DeleteButton extends React.Component {
  constructor(props) {
    super(props)

    this.deleteRequest = this.deleteRequest.bind(this)
  }

  deleteRequest(e){
    e.preventDefault();

    const deleteuser = {
      userID: this.props.userid,
			friendID: this.props.data
    }

    //sends DELETE request to delete the request of a user
    fetch("http://localhost:3001/delete-friend",
		{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(deleteuser)
		})
		.then(response => response.json())
		.then(body => {
			if(body.success){
				alert("You deleted the friend request of " + this.props.name)
			}
      else {
        alert("Delete friend request failed.")
      }
		})

  }

  render() {
    return (
      <button id="delete-btn" onClick={this.deleteRequest}>Delete</button>
    )
  }
}

export default DeleteButton