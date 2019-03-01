import React, { Component } from "react";
import ElectionContract from "./contracts/Election.json";
import getWeb3 from "./utils/getWeb3";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppNavBar from './components/layout/AppNavBar';
import Dashboard from './components/layout/Dashboard';
import AddCandidate from './components/candidate/AddCandidate';
import candidateDetails from './components/candidate/CandidateDetails';
import Winner from './components/candidate/winner';

import "./App.css";
import Candidates from "./components/candidate/Candidate.js";

class App extends Component {
  
  
    state = { storageValue: 0, web3: null, accounts: null, contract: null ,isVoted:false};

    
  componentDidMount = async () => {

    try {
      // Get network provider and web3 instance.

      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      
      //console.log(account);
      const accounts = await web3.eth.getAccounts();
      
      var oldAccount = accounts[0];

      
      

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ElectionContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ElectionContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      

      this.setState({ web3, accounts, contract: instance }, this.runExample);

      var accountInterval = setInterval( async () => {
        const newAccounts = await web3.eth.getAccounts();
        
        var newAccount = newAccounts[0];
  
        if (newAccount !== oldAccount) {
          oldAccount = newAccount;
          console.log("account::",newAccounts);
          this.setState({
            accounts:newAccounts
          });
        }
        const contract = this.state.contract;
        var votedResponse = await contract.methods.isVoted().call({ from: accounts[0] });
        if(this.state.isVoted != votedResponse){
        this.setState({
          isVoted:votedResponse
        });
        //console.log("voting response : ",votedResponse);
      }
      //console.log("voting response : ",votedResponse);
      }, 100);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
    
  };

  
  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    
    //await contract.methods.addCandidate("Kapil",12,"abc","noida").send({ from: accounts[0] });
    //console.log(accounts);
    // Get the value from the contract to prove it worked.
    //const allCandidate = await contract.methods.getCandidateNames().call();

    //console.log(allCandidate);
    const response = await contract.methods.getCandidateCount().call();
    //var isOwner = await contract.methods.isOwner().call({from:accounts[0]});

    //console.log(accounts);
    //console.log("owner or not:: ",isOwner);
    // Update state with the result.
    //console.log("candidate count::: ",response);
    this.setState({ storageValue: response });
  };
  
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      
      <Router>
        <div className="App">
          <AppNavBar {...this.state}></AppNavBar>
          <div className="container">
              <Switch>
                  
                  <Route
                    exact path='/'
                    render={(props) => <Candidates {...this.state} />}
                  />
                  <Route
                    exact path='/candidate/add'
                    render={(props) => <AddCandidate {...this.state} />}
                  />
                  <Route exact path="/candidate/details" component={candidateDetails}></Route>
                  
                  <Route
                    exact path='/candidate/winner'
                    render={(props) => <Winner {...this.state} 
                    />}
                  />
              </Switch>
          </div>
         </div>
      </Router>
      
    );
  }
}

export default App;
