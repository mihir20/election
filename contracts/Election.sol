pragma solidity^ 0.5.0;

contract Election {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint=>Candidate) public candidates;

    uint public candidateCount;

    constructor() public{
        addCandidate("Modi");
        addCandidate("Rahul");
    }

    function addCandidate(string memory _name) private{
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount,_name,0);
    }

}