import React from 'react';
import Header from '../Components/Header.js'
import LeftSideBar from '../Components/LeftSideBar.js'
import EditPost from '../Components/EditPost'
import DeletePost from '../Components/DeletePost'

class Profile extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      posts: [],
      _id: localStorage.getItem("_id")
    }

  }

  componentDidMount(){

    //gets the posts of the user
    fetch("http://localhost:3001/profile",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({_id: this.state._id})  
    })
    .then(response => response.json())
    .then(body => {
      //saves the posts in the state
      if(body.success){
        this.setState({posts: body.posts})
      } else {
        alert("Unable to view user profile.")
      }
      
    });

  }

  render() {
    return(
      <div>
        <div className="my-post">
          {
            this.state.posts.map((post, i) => {
              return (
                <div key={i} id="my-post">
                  <div id ="post-author">{post.author.firstName} {post.author.lastName}</div>
                  <div id ="post-time">{post.timestamp}</div>
                  <div id ="post-content">{post.content}</div>
                  <EditPost data={post._id}/> 
                  <DeletePost data={post._id}/>
                </div>
              )
            })
          }
        </div>
        <Header/>
        <LeftSideBar profile={this.state.username} _id={this.state._id}/>
      </div>
    )
  }

}

export default Profile