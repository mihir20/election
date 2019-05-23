let Election = artifacts.require("./Election.sol");

contract("Election", (accounts)=>{
    let electionInsance;
    it("Initialize contract with 2 accounts", ()=>{
        return Election.deployed().then((instance)=>{
            return instance.candidateCount();
        }).then((count)=>{
            assert.equal(count,2);
        });
    });

    it("Initialize contract with correct values", ()=>{
        return Election.deployed().then((instance)=>{
            electionInsance = instance;
            return electionInsance.candidates(1);
        }).then((candidate)=>{
            assert.equal(candidate[0],1,"contains correct id");
            assert.equal(candidate[1],"Modi","contains correct name");
            assert.equal(candidate[2],0,"contains correct vote count");
            return electionInsance.candidates(2);
        }).then((candidate)=>{
            assert.equal(candidate[0],2,"contains correct id");
            assert.equal(candidate[1],"Rahul","contains correct name");
            assert.equal(candidate[2],0,"contains correct vote count");
        });
    });


    it("allows a voter to cast a vote", function() {
        return Election.deployed().then(function(instance) {
          electionInstance = instance;
          candidateId = 1;
          return electionInstance.vote(candidateId, { from: accounts[0] });
        }).then(function(receipt) {
          return electionInstance.voters(accounts[0]);
        }).then(function(voted) {
          assert(voted, "the voter was marked as voted");
          return electionInstance.candidates(candidateId);
        }).then(function(candidate) {
          var voteCount = candidate[2];
          assert.equal(voteCount, 1, "increments the candidate's vote count");
        })
      });
    

});