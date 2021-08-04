import React from 'react'
import AcceptButton from './AcceptButton'
import DeleteButton from './DeleteButton'

class FriendRequest extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      userid: this.props._id,
      people: []
    }
  }

  componentDidMount() {

    //sends POST request to display the users who sent a friend request
    fetch("http://localhost:3001/display-request",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}, 
			body: JSON.stringify({_id: this.state.userid})
		})
		.then(response => response.json())
		.then(body => {
			this.setState({
				people: body
			})
		})
  }


  render() {
    return (
      <div className="friendrequest">
        <h4 id="h4-feed">Friend Requests</h4><hr/>
          { /*displays each items in the list*/
            this.state.people.map((p, i) => {
              return (
                <div key={i} className="grp">
                  {p._id.firstName} {p._id.lastName}<br/>
                  <AcceptButton userid={this.state.userid} data={p._id._id} name={p._id.firstName} /> {/*pass the _id to apply changes*/}
                  <DeleteButton userid={this.state.userid} data={p._id._id} name={p._id.firstName} /><hr/>
                </div>
              )
            }) 
          }
      </div>
    )
  }
}

export default FriendRequest