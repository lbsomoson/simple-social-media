import React from 'react'

class Password extends React.Component {
	
	render(){
		return(
			<input type="password"  id="password"
				value={this.props.value}
				onChange={this.props.changeHandler}
				placeholder={this.props.holder}
				required
			/>
		)
	}
}

export default Password