import React, { Component } from 'react'
import Candidate from '../candidate/Candidate';
class Dashboard extends Component {

  render() {
    return (
      <div className="row">
        <div className="col-md-10">
            <Candidate/>
        </div>

       
      </div>
    )
  }
}
export default Dashboard;