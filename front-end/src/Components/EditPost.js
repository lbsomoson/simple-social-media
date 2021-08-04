import React from 'react';

class EditPost extends React.Component {
  
  constructor(props){
    super(props)

    this.state = {
      isClicked: false,
      content: ""
    }

    this.saveEdit = this.saveEdit.bind(this)
    this.editPost = this.editPost.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  saveEdit(e) {
    e.preventDefault();

    //updates the timestamp and content of the post to be edited
    const newPost = {
      _id: this.props.data,
      timestamp: new Date(),
      content: this.state.content
    }

    //send POST request to update fields of a post
    fetch("http://localhost:3001/edit-post",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newPost)
		})
		.then(response => response.json())
		.then(body => {
      //prompts the user
			if(body.edited){
				alert("You edited the post. Refresh page to see changes.")
			}
      else {
        alert("Edit post failed.")
      }
		})

    //clears the fields of the form
		const form = document.getElementsByName("postDetails");
		form[0].reset();

    //resets the state after editing
    this.setState({ isClicked: false })
  }

  editPost(e) {
    e.preventDefault();

    //sets the isClicked state to true to open the text area
    this.setState({ isClicked: true })
  }

  handleChange(e) {
    this.setState({ content: e.target.value })
  }

  render(){
    if(!this.state.isClicked){
      return(
        <button id="editpost-btn" onClick={this.editPost}>Edit Post</button>
      )
    } else {
      return (
        <div>
          <form name="postDetails">
            <input type="textarea" id="edit-post" value={this.state.content} onChange={this.handleChange} placeholder="Edit your post here"/><br />
            <button id="editpost-btn" onClick={this.saveEdit}>Save Changes</button>
          </form>
        </div>
      )
    }
    
  }
}

export default EditPost