import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getWeb3 from './../../utils/getWeb3';
import ElectionContract from "./../../contracts/Election.json";
//import {AppContext} from './../../App.js';


class AddCandidate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accounts : props.accounts,
      contract : props.contract,
      storageValue:props.storageValue,
      name:'',
      age:'',
      course:'',
      Details:''
    }
    
  }
  addNewCandidate = async (name,age,course,details) => {
    const { accounts, contract } = this.state;

    //console.log(name,age,course,details);
    // Stores a given value, 5 by default.
    await contract.methods.addCandidate(name,age,course,details).send({ from: accounts[0] });
    //console.log("candidate added successfullly");
    //await contract.methods.addCandidate("Kapil",12,"abc","noida").send({ from: accounts[0] });
    //console.log(accounts[0]);
    // Get the value from the contract to prove it worked.
    //const allCandidate = await contract.methods.getCandidateNames().call();

    //console.log(allCandidate);
    const response = await contract.methods.getCandidateCount().call();

    // Update state with the result.
    //console.log("candidate count::: ",response);
    this.setState({ storageValue: response });

    this.setState({
      name:'',
      age:'',
      course:'',
      Details:''
    });
  };


  onSubmit =  (e) => {
    e.preventDefault();

    var name = this.state.name;
    var age = parseInt(this.state.age);
    var course = this.state.course;
    var details = this.state.Details;
  
    //console.log(name,age,course,details);
    
    this.addNewCandidate(name,age,course,details);

    //const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
     //contract.methods.addCandidate(name,age,course,details).send({ from: accounts[0] });
    
    //console.log(this.state.accounts1);
    // Get the value from the contract to prove it worked.
    //const allCandidate =  contract.methods.getCandidateNames().call();

    //console.log(allCandidate);
    //const response =  contract.methods.getCandidateCount().call();

    // Update state with the result.
    //console.log("candidate count::: ",response);
  };
  onChange = (e) =>{
      const controlName = e.target.name;
      switch(controlName){
        case 'name': this.setState({name:e.target.value})
        break;
        case 'age': this.setState({age:e.target.value})
        break;
        case 'course': this.setState({course:e.target.value})
        break;
        case 'Details': this.setState({Details:e.target.value})
        break; 
      }

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

          <div className="card">
              <div className="card-header">Add Candidate</div>
              <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            minLength="2"
                            required
                            onChange={this.onChange}
                            value={this.state.name}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            className="form-control"
                            name="age"
                            maxLength='2'
                            required
                            onChange={this.onChange}
                            value={this.state.age}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="course">Course</label>
                        <input
                            type="text"
                            className="form-control"
                            name="course"
                            minLength="2"
                            required
                            onChange={this.onChange}
                            value={this.state.course}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="Details">Candidate Bio</label>
                        <input
                            type="textarea"
                            className="form-control"
                            name="Details"
                            minLength="2"
                            required
                            onChange={this.onChange}
                            value={this.state.Details}
                        />
                      </div>
                      <input readOnly type="Submit" value="Submit" className="btn btn-primary btn-block"/>
                      
                  </form>
                  
              </div>

          </div>
          
      </div>
    )
  }
}

export default AddCandidate;