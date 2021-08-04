import React from 'react'
import { Redirect } from 'react-router-dom';
import Password from '../Components/Password'

class SignUp extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			signedUp: false,
			fname: "",
			lname: "",
			email: "",
			password: "",
			rpassword: "",
			invalidmsg: "",
			mismatchmsg: "",
			emailErr: "",
			errSignUp: ""
		}

		this.handleClick = this.handleClick.bind(this)
		this.changeFNameHandler = this.changeFNameHandler.bind(this)
		this.changeLNameHandler = this.changeLNameHandler.bind(this)
		this.changeEmailHandler = this.changeEmailHandler.bind(this)
		this.changePasswordHandler = this.changePasswordHandler.bind(this)
		this.repeatPasswordHandler = this.repeatPasswordHandler.bind(this)
	}

	changeFNameHandler(e){
		this.setState({ fname:  e.target.value })
	}

	changeLNameHandler(e){
		this.setState({ lname:  e.target.value })
	}

	changeEmailHandler(e){
		this.setState({ email:  e.target.value, emailErr: "" })
	}

	changePasswordHandler(e){
		this.setState({ password:  e.target.value, invalidmsg: "", mismatchmsg: "", errSignUp: "", emailErr: "" })	//removes the error when changes applied
	}

	repeatPasswordHandler(e){
		if(this.state.password !== ""){
			this.setState({ rpassword:  e.target.value, invalidmsg: "", mismatchmsg: "", errSignUp: "", emailErr: "" })
		}	
	}

	handleClick(e) {
		e.preventDefault();

		if(this.state.password.length >= 8  && /\d/.test(this.state.password) && /[a-z]/.test(this.state.password) && /[A-Z]/.test(this.state.password) && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(this.state.email) && this.state.password === this.state.rpassword){
			const user = {
				firstName: this.state.fname,
				lastName: this.state.lname,
				email: this.state.email,
				password: this.state.password
			}
	
			//sends a POST request for signing up
			fetch(
				"http://localhost:3001/sign-up",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(user)
				})
				.then(response => response.json())
				.then(body => {
					if(body.success){ 
						this.setState({ signedUp: true })
					} else { 
						this.setState({ errSignUp: "Error in signing up!" })
					}
			});
		}
		
		else{
			if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(this.state.email)){
				this.setState({ emailErr: "Invalid email.", errSignUp: "Error in signing up!" })
			}
			if(this.state.password !== this.state.rpassword){
				this.setState({ mismatchmsg: "Password Mismatch.", errSignUp: "Error in signing up!" })
			}
			if(this.state.password.length < 8  || !/\d/.test(this.state.password) || !/[a-z]/.test(this.state.password) || !/[A-Z]/.test(this.state.password)){
				this.setState({ invalidmsg: "Passwords should be at least 8 characters, have at least 1 number, 1 lowercase letter, and 1 uppercase letter.", errSignUp: "Error in signing up!" })
			}
		}
		
	}

	render() {
		if(!this.state.signedUp){
			return(
				<div className="signup">
					<div className="img-signup">
						<img src="/bg1.gif" alt="img" id="signup-img"/>
					</div>
					<form name="userDetails" id="signupform">
						<h3>Sign up form</h3> 

						<input type="text" id="fname" 
							value={this.state.fname} 
							onChange={this.changeFNameHandler} 
							placeholder="First Name" required/><br /><br />

						<input type="text" id="lname" 
							value={this.state.lname} 
							onChange={this.changeLNameHandler} 
							placeholder="Last Name" required/><br /><br />

						<input type="email" id="email" 
							value={this.state.email} 
							onChange={this.changeEmailHandler} 
							placeholder="Email" required/><br /><label>{this.state.emailErr}</label><br />
							

						<Password 
							value={this.state.password} 
							changeHandler={this.changePasswordHandler} 
							holder="Password"/><br />
							<label>{this.state.invalidmsg}</label><br />

						<Password 
							value={this.state.rpassword} 
							changeHandler={this.repeatPasswordHandler} 
							holder="Repeat Password"/><br />
							<label>{this.state.mismatchmsg}</label><br /><br />

						<button id="signup-btn" onClick={this.handleClick}>Sign Up</button><br/>
						<label>{this.state.errSignUp}</label>
					</form>
				</div>
			)
		}
		
		else {
			return (<div> <Redirect to="/log-in"/> </div>)
		}
		
	}
}

export default SignUp