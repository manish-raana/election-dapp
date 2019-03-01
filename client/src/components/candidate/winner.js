import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import getWeb3 from './../../utils/getWeb3';

const AllCandidates=[];
class winner extends Component {

    constructor(props) {
        super(props);
        this.state = {
        accounts : props.accounts,
        contract : props.contract,
        winner:''

        }
      }
  
      componentWillReceiveProps(props){
          this.setState({
              accounts:props.accounts
          });
      }

      getCandidates = async () => {
        const { accounts, contract } = this.state;

        //const allCandidate = await contract.methods.getCandidateData(1).call();
    
        //console.log(allCandidate[1]);
        const totalCandidate = await contract.methods.getCandidateCount().call();
        
        // Update state with the result.
        //console.log("candidate count::: ",totalCandidate);

        for(var i=1;i<=totalCandidate;i++){
            const candidate = await contract.methods.getCandidateData(i).call();
            AllCandidates[i-1]={
                firstName: candidate[0],
                voteCount:candidate[4]
            };
        }
        var votedResponse = await contract.methods.isVoted().call({ from: accounts[0] });
        this.setState({
          isVoted:votedResponse
        });
        
    }
  accountAddress = async ()=> {
    
    const { accounts, contract } = this.state;
    const winnerName = await contract.methods.getWinner().call();

    this.setState({
        winner: winnerName
    });

    //console.log("Winner Name : ",this.state.winner);
 } 
  render() {
    this.getCandidates();
    const Candidates= AllCandidates;
    return (
      <div>
        <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left"/> Back To Dashboard
              </Link>
            </div>
          </div>
          <table className="table table-striped border border-primary">
                    <thead className="thead-inverse border border-primary">
                        <tr>
                            <th><i className="fas fa-users"></i>  Candidate Name</th>
                            
                            <th>Vote Count</th>
                            
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        {Candidates.map((Candidate,i) => (
                            <tr key={i}>
                                <td>{Candidate.firstName}</td>
                                <td>{Candidate.voteCount}</td>
                                <td/>
                                
                                <td/>
                            </tr>
                        ))}
                    </tbody>
                </table>
        <input readOnly onClick={this.accountAddress} value="Get Winner" className="btn btn-secondary btn-block-sm"/>
        <br/>
        <br/>
        <br/>
        <br/>
        <label className="label label-default" htmlFor="name">{this.state.winner}</label>
      </div>
    )
  }
}
export default winner;
