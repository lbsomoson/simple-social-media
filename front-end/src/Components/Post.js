import React from 'react'

class Post extends React.Component {

  constructor(props){
    super(props)
    
    this.state = {
      posts: [],
      postauthor: ""
    }

  }

  componentDidMount() {
    
    //sends POST request to get the post of the user and the user's friends
    fetch("http://localhost:3001/show-post",
    {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({_id: this.props._id})
    })
    .then(response => response.json())
    .then(body => {
      if(body.success){
        this.setState({ posts: body.posts })
      } else {
        alert("Unable to view posts.")
      }
        
    })
  }

  render() {

    return (
      <div className="post">
        {
          this.state.posts.map((post, i) => {
            return (
              <div key={i} id="post">
                <div id ="post-author">{post.author.firstName} {post.author.lastName}</div>
                <div id="post-time"> {post.timestamp}</div>
                <div id="post-content">{post.content}</div> <br />
              </div>
            )
          })
        }
      </div>
    )
  }

}

export default Post