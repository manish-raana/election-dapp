import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class AppNavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
    accounts : props.accounts,
    contract : props.contract,
    isOwner:''
    }
  }

  componentWillReceiveProps(props){
      this.setState({
          accounts:props.accounts,
          contract:props.contract
      });
  }
  getData = async () =>{
    const { accounts, contract } = this.state;
    var isOwnerResponse = await contract.methods.isOwner().call({from:accounts[0]});
    this.setState({
      isOwner:isOwnerResponse
    });
  }
  
  render() {
    this.getData();
    //console.log(this.state.isOwner);
    return (
      
      <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
        <div className="container ">
            <Link to="/" className="navbar-brand">
                Dashboard
            </Link>
            <button className ="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarMain"
            >
            
            <span className="navbar-toggler-icon">
            </span>
            </button>
            
            {this.state.isOwner ? (
                <div className="collapse navbar-collapse" id="navbarMain">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                    <Link to="/candidate/add" className="nav-link">
                        AddCandidate
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/candidate/winner" className="nav-link">
                          Winner
                    </Link>
                    </li>
                </ul>
            </div>
            ):(
              <div/>
            )
            }
            
            
        </div>
      </nav>
    )
  }
}
export default AppNavBar;