pragma solidity 0.5.0;

contract Election {
    
    address owner;
    
    modifier ownerOnly(){
        require(msg.sender == owner,"Not Owner");
        _;
    }
    
    uint totalVote;
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint age;
        string course;
        string bio; 
        uint voteCount;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters;
    // Store Candidates
    // Fetch Candidate
    mapping(uint => Candidate) public candidates;
    // Store Candidates Count
    uint public candidatesCount;

    // voted event
    event votedEvent (
        uint indexed _candidateId
    );

    constructor () public {
        owner = msg.sender;

    }

    function isVoted() external view returns(bool){
        return voters[msg.sender];
    }

    function addCandidate (string memory _name, uint _age, string memory _course,string memory _bio) public ownerOnly{
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name,_age,_course,_bio, 0);
    }
    function getCandidateCount() external view returns(uint) {
        return candidatesCount;
    }
    function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender],"Already voted");

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount,"Incorrect candidate Id");

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;
        
        //updating total vote
        totalVote++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }
    function getWinner() public ownerOnly view returns(string memory){
        require(totalVote != 0,"No Vote yet!");
        string memory winner;
        if(candidatesCount == 1){
            return candidates[1].name;
        }
        for(uint i = 1; i<candidatesCount; i++){
            if(candidates[i+1].voteCount > candidates[i].voteCount){
                winner = candidates[i+1].name;
            }
            else if(candidates[i+1].voteCount <= candidates[i].voteCount){
                winner = candidates[i].name;
            }
        }
        
        return winner;
    }
    
    function getCandidateData(uint _index) external view returns (string memory,uint,string memory,string memory,uint){
        
        return (candidates[_index].name,candidates[_index].age,candidates[_index].course,candidates[_index].bio,candidates[_index].voteCount);
    }
    function isOwner() external view returns(bool){
        
        return (msg.sender == owner);
    }
    
}