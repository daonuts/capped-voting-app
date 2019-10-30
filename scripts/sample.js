const Web3 = require("web3")
const web3 = new Web3("wss://rinkeby.infura.io/ws")
const tokenABI = require("../build/contracts/MiniMeToken.json").abi
const votingABI = require("../build/contracts/KarmaCapVoting.json").abi
const Voting = new web3.eth.Contract(votingABI, "0xEf6e74B80900EE8474c89fA19dA84F1465937045")
const Commerce = new web3.eth.Contract(tokenABI, "0xFfeD81628B62B1f92b6595539A995c9d734411F9")
const Karma = new web3.eth.Contract(tokenABI, "0x4a611d0C71463C3a28e904CFe05b15D1A951701a")

// get current block when poll is started (web3.eth.isSyncing -> highestBlock), for example block 3973370
let blockAtPollStart = 3973370

// get total voter weight for calculating quorum
getTotalVoterWeight().then(w=>console.log(`total voter weight: ${w}`))

// get account from username with Registry.methods.usernameToOwner(usernameInHex).call().then(a=>account=a)
const account = "0x7b6C819e9db25c302A9adD821361bB95524023D7" // dummy02
Voting.methods.getVoterWeightAtBlock(blockAtPollStart, account).call().then(w=>console.log(`${account} has weight: ${w}`))

async function getTotalVoterWeight(){
  let commerceTotal = await Commerce.methods.totalSupplyAt(blockAtPollStart).call().then(web3.utils.toBN)
  let karmaTotal = await Karma.methods.totalSupplyAt(blockAtPollStart).call().then(web3.utils.toBN)
  if(commerceTotal.gt(karmaTotal)) return karmaTotal
  else return commerceTotal
}
