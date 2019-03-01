import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class CandidateDetails extends Component {

  constructor(props){
    super(props);
    this.details = props.location.state.details;
  }
  render() {
    return (
      <div>
        <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left"/> Back To Dashboard
              </Link>
            </div>
          </div>
        <h1>Candidate Details</h1>
        <table className="table table-striped">
            <thead className="thead-inverse">
                <tr>    
                    <th>Candidate Name</th>
                    <th>Age</th>
                    <th>Course</th>
                    <th>Bio</th>
                            
                    <th/>
                </tr>
            </thead>
            <tbody>
              <tr>
                  <td>{this.details.firstName}</td>
                  <td>{this.details.age}</td>
                  <td>{this.details.course}</td>
                  <td>{this.details.details}</td>
              </tr>
                        
          </tbody>
        </table>
      </div>
    )
  }
}
export default CandidateDetails;
