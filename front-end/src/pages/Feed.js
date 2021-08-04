import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header.js'
import LeftSideBar from '../Components/LeftSideBar.js'
import SendRequest from '../Components/SendRequest.js';
import FriendRequest from '../Components/FriendRequest.js';
import Post from '../Components/Post.js';

class Feed extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			checkedIfLoggedIn: false,
			isLoggedIn: null,
			_id: localStorage.getItem("_id")
		};

		this.handleCLickPost = this.handleCLickPost.bind(this);
	}

	handleCLickPost(e){
		e.preventDefault();

		//object to be saved in the database
		const postInfo = {
			author: this.state._id,
			timestamp: new Date(),
			content: document.getElementById("content").value
		}
		
		fetch(
			"http://localhost:3001/feed-create-post",
			{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(postInfo)   
		})
		.then(response => response.json())
		.then(body => {
			//prompts the user
			if(body.postSuccess) { alert("Posted successfully! Refresh page to see changes."); }
			else { alert("Post failed"); }
		})

		//clears the fields of the form
		const form = document.getElementsByName("postDetails");
		form[0].reset();
	}

	componentDidMount(){
		//send POST request to check if user is logged in
		fetch("http://localhost:3001/feed",
			{
				method: "POST",
				credentials: "include"
			})
			.then(response => response.json())
			.then(body => {
				//update the state depending if isLoggedIn or not 
				if(body.isLoggedIn) {
					this.setState( {checkedIfLoggedIn: true, isLoggedIn: true, _id: localStorage.getItem("_id")} )
				} else {
					this.setState( {checkedIfLoggedIn: true, isLoggedIn: false} )
				}
			});
	}

	render() {

		if(!this.state.checkedIfLoggedIn){
			//delay
			return (<div></div>)
		}
		else {
			if(this.state.isLoggedIn){
				//views feed
				return(
					<div>
						<LeftSideBar _id={this.state._id}/>
						<div id="postDetails">
							<h4 id="h4-post">Create Post</h4>
							<form name="postDetails">
								<input type="textarea" id="content" placeholder="What's inside of your mind?" />
								<button type="submit" id="post-btn" onClick={this.handleCLickPost}>Post</button>
							</form>
						</div>
						<Post _id={this.state._id}/>
						<SendRequest _id={this.state._id}/>
						<FriendRequest _id={this.state._id}/>
						<Header />
					</div>
				)
			}
			//redirect to home when logged out
			else {
				return <Redirect to="/" />
			}
		}
			
	}
}

export default Feed