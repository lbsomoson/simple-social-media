import React from 'react'

class DeletePost extends React.Component {
  constructor(props){
    super(props)

    this.deletePost = this.deletePost.bind(this)
  }

  deletePost(e) {
    e.preventDefault();

    //sends DELETE request to delete the post of the user
    fetch("http://localhost:3001/delete-post",
		{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({_id: this.props.data})
		})
		.then(response => response.json())
		.then(body => {
      //prompts the user if success of failed
			if(body.success){
				alert("You deleted the post. Refresh page to see changes.")
			}
      else {
        alert("Delete post failed.")
      }
		})

  }

  render(){
    return (
      <button id="deletepost-btn" onClick={this.deletePost}>Delete Post</button>
    )
  }

}

export default DeletePost