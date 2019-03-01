import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const AllCandidates=[];
class Candidates extends Component {

    constructor(props) {
        super(props);
        this.state = {
        accounts : props.accounts,
        contract : props.contract,
        storageValue:props.storageValue,
          value: '',
          key:'',
          isVoted : true
        }
      }
      componentWillReceiveProps(props){
        this.setState({
            accounts:props.accounts,
            //isVoted:props.isVoted
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
                age:candidate[1],
                course:candidate[2],
                details:candidate[3],
                voteCount:candidate[4]
            };
        }
        var votedResponse = await contract.methods.isVoted().call({ from: accounts[0] });
        this.setState({
          isVoted:votedResponse
        });
        
    }
      
      _handleChange = (event) => {
        this.setState({ value: event.target.value,key : event.target.options.selectedIndex })
        
      }
      //const selectedIndex = event.target.options.selectedIndex; 
      //console.log(event.target.options[selectedIndex].getAttribute('data-key'));
        dropDownValue = async (event) => {
            const { accounts, contract } = this.state;
            
            await contract.methods.vote(this.state.key).send({from:accounts[0]});
            //console.log( this.state.value );
            //console.log( this.state.key );
          //console.log('The link was clicked.');
        }
  render() {
    this.getCandidates();
    const Candidates= AllCandidates;
    //console.log(this.state.isVoted);
    if(Candidates){
        return(
            <div>
                
                <table className="table table-striped border border-primary">
                    <thead className="thead-inverse border border-primary">
                        <tr>
                            <th><i className="fas fa-users"></i>  Candidate Name</th>
                            <th></th>
                            <th></th>
                            <th>Candidate Details</th>
                            
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        {Candidates.map((Candidate,i) => (
                            <tr key={i}>
                                <td>
                                    {Candidate.firstName}
                                    
                                </td>
                                <td>{Candidate.id}</td>
                                <td/>
                                
                                <td>
                                    <Link to={{pathname:'/candidate/details',state:{details:Candidate}}} className="btn btn-secondary btn-sm">
                                    
                                    Details <i className="fas fa-arrow-circle-right"/>

                                    </Link>
                                </td>
                                <td/>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                    
                <div className="border border-primary p-3">
                    
                {! this.state.isVoted ? (
                    
                    <div className="form-group">
                        <label >Select list:</label>
                        <select name="parameters" className="form-control" id="sel1"
                            defaultValue={this.state.value}
                            onChange={this._handleChange}    
                        >
                        <option defaultValue hidden>Please Select</option>
                            {Candidates.map((Candidate,i) => (
                                <option key={i} data-key={i}>{Candidate.firstName}</option>
                            ))}
                            
                        </select>
                        <br/>
                      
                            <input readOnly onClick={this.dropDownValue} value="Vote" className="btn btn-secondary btn-block"/>
                        
                        
                    </div>
                ):(
                    <p>You have successfully voted!</p>
                    
                    )}
                            
                </div>
            </div>
            
        );
    }
    else{
        return <h1>Loading....</h1>
    }
  }
}
export default Candidates;