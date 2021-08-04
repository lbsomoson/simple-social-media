import React from 'react';

class Header extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			query: ""
		}

		this.handleChange = this.handleChange.bind(this);
	}
	
	handleChange(e) {
		this.setState({ query:  e.target.value })
	}

	render(){

		return(
			<div>
					<div className="header">
						<div id="search">
							<form name="search">
								<input type="search" id="search-txt" name="search" onChange={this.handleChange} value={this.state.query} placeholder="search"/>
								<a id="search-btn" href={"/results?query=" + this.state.query} value={this.state.query}>Search</a>
							</form>
						</div>
					</div>
					<div id="home-link">
						<a id="link" href="/feed">Home</a>	{/*redirect to feed when clicked*/}
					</div>
			</div>
		)
		
	}

}

export default Header