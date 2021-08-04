import React from 'react'
import { Redirect } from 'react-router-dom';

class Home extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			login: false,
			signup: false
		}

		this.handleClickLogIn = this.handleClickLogIn.bind(this)
		this.handleClickSignUp = this.handleClickSignUp.bind(this)
	}	

	handleClickLogIn(e){
		e.preventDefault();
		this.setState({ login: true });
	}

	handleClickSignUp(e){
		e.preventDefault();
		this.setState({ signup: true });
	}

	render(){
		if(!this.state.signup && !this.state.login){
			return(
				<div>
					<div className="home">
						<div id="home-bg">
							<h1>Welcome to Diffuse!</h1>
						</div>
						<br/>
						<button type="submit" className="btn" id="loginbtn" onClick={this.handleClickLogIn}>Log in</button><br />
						<button type="button" className="btn" id="signupbtn" onClick={this.handleClickSignUp}>Sign up</button>
					</div>
				</div>
			)
		}
		if (this.state.signup) return <Redirect to="/sign-up" />
		else if (this.state.login) return <Redirect to="/log-in" />
	}
}

export default Home