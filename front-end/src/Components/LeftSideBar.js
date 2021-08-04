import React from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

class LeftSideBar extends React.Component {
	constructor(props) {
			super(props);
			
			this.state = {
				_id: this.props._id,
				username: localStorage.getItem("username"),
				isLoggedIn: true,
				openProfile: false,
				people: []
			}

			this.handleClickLogOut = this.handleClickLogOut.bind(this);
	}

	handleClickLogOut(e) {
			e.preventDefault();

			//delete cookie with authToken
			const cookies = new Cookies();
			cookies.remove("authToken");

			//delete username in local storage
			localStorage.removeItem("username");
			localStorage.removeItem("_id");
			this.setState({isLoggedIn: false});
	} 

	componentDidMount() {
		this.setState({openProfile: true})

		//sends POST request to display friends of the user
		fetch("http://localhost:3001/display-friends",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}, 
			body: JSON.stringify({_id: this.state._id})	//_id of the user
		})
		.then(response => response.json())
		.then(body => {
			this.setState({
				people: body, 
				username: localStorage.getItem("username")
			})
		})

	}

	render(){
		if(this.state.isLoggedIn){
			return (
				<div className="leftsidebar">
					<div><a href="http://localhost:3000/profile" title="visit profile">{this.state.username}</a></div>
					<button id="logout-btn" onClick={this.handleClickLogOut}>Log out</button><br/><br/>
					<div className="friendlist">
						<h4 id="h4-feed">Friends List</h4><hr/>
							{
								this.state.people.map((p,i) => {
									return (
										<div key={i}>
											{p._id.firstName} {p._id.lastName}<hr/>
										</div>
									)
								})
							}
					</div>
				</div>
			)
		}
		else {
			return <Redirect to="/" />
		}

	}
		
}	

export default LeftSideBar