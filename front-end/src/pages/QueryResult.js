import React from 'react'
import Header from '../Components/Header.js'

const queryString = require('query-string')

class QueryResult extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      query: queryString.parse(props.location.search).query,
      results: [],
      isClicked: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {

    this.setState({isClicked: true})
  }

  componentDidMount(){

    //sends POST request to find a user
    fetch(
      "http://localhost:3001/find-user", 
      {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({search: this.state.query})
		})
		.then(response => response.json())
		.then(body => {
      if(body.success){
        this.setState({ results: body.users })
      } else {
        alert("Unable to view results.")
      }
      
		})

  }

  render(){
      return (
        <div className="result">
          <h4 id="h4-feed">Results for "{this.state.query}":</h4>
          {
            this.state.results.map((p, i) => {
              return (
                <div key={i} id="results">
                  <div id="post-author"><a href={'/user-profile?id=' + p._id} onClick={this.handleClick}>{p.firstName} {p.lastName}</a></div>
                </div>
              )
            })
          }
          <Header />
        </div>
      )
    
  }

}

export default QueryResult 