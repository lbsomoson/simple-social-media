import React from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

class LogIn extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			verified: false,
			email: "",
			password: "",
			errMsg: ""
		};
		
		this.handleClickLogIn = this.handleClickLogIn.bind(this);
		this.changeEmailHandler = this.changeEmailHandler.bind(this);
		this.changePasswordHandler = this.changePasswordHandler.bind(this);
	}
	
changeEmailHandler(e) {
	this.setState({ email:  e.target.value, errMsg: "" })
}

changePasswordHandler(e) {
	this.setState({ password:  e.target.value, errMsg: "" })
}

	handleClickLogIn(e) {
		e.preventDefault();

		const credentials = {
			email: document.getElementById("email").value,
			password: document.getElementById("password").value
		}

		//sends a POST request
		fetch(
			"http://localhost:3001/log-in", 
			{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(credentials)
		})
		.then(response => response.json())
		.then(body => {
			if(!body.success) { this.setState({ errMsg: "User failed to log in." }) }
			else {
				//store token as cookies
				const cookies = new Cookies();
				cookies.set(
					"authToken",
					body.token,
					{
						path: "localhost:3001/log-in",
						age: 60*60,
						sameSite: "lax"
					});
					
					localStorage.setItem("username", body.username);
					localStorage.setItem("_id", body._id);
					this.setState({ verified: true });	
					
			}
		})

		//clears the fields of the form
		const form = document.getElementsByName("userDetails");
		form[0].reset();

	}

	render() {
		if(!this.state.verified){
			return(
				<div>
					<div className="img-login">
						<img src="/bg.gif" alt="img" id="login-img"/>
					</div>
					<div className="login">
						<h3>Login user</h3>
						<form name="userDetails" id="loginform">
							<input type="email" id="email" value={this.state.email} onChange={this.changeEmailHandler} placeholder="Email"/><br /><br />
							<input type="password" id="password" value={this.state.password} onChange={this.changePasswordHandler} placeholder="Password"/><br /><br /><br />
							<button type="submit" id="login-btn" onClick={this.handleClickLogIn}>Log in</button><br />
							<label>{this.state.errMsg}</label>
						</form>
					</div>
				</div>
				
			)
		}
		else {
			//redirect user's feed
			return <Redirect to="/feed" />
		}
	}
}

export default LogIn