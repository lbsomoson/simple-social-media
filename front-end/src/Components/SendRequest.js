import React from 'react';
import SendButton from './SendButton';

class SendRequest extends React.Component {
	constructor(props){
			super(props)

			this.state = {
				userid: this.props._id,
				people: []
			}

	}

	componentDidMount(){

		//sends a POST request to display people you may know
		fetch("http://localhost:3001/find-people",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}, 
			body: JSON.stringify({_id: this.state.userid})
		})
		.then(response => response.json())
		.then(body => {
			if(body.success){
				this.setState({
					people: body.users
				})
			} else {
				alert('Unable to show users')
			}
		
		})
	}

	render(){

		return(
			<div className="sendrequest">
				<h4 id="h4-feed">People you may know!</h4><hr/>
					{
						this.state.people.map((p, i) => {
							return (
								<div key={i} className="grp">
									{p.firstName} {p.lastName}<br/>
									<SendButton userid={this.state.userid} data={p._id} name={p.firstName} /><br /> <hr/>
								</div>
							)
						})
					}
			</div>
		)
	}

}

export default SendRequest