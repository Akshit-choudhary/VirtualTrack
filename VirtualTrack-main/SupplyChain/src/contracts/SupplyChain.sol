pragma solidity >=0.5.0; // Version of Solidity - 0.5.0

contract SupplyChain {
  string public name;
  uint public contractCount = 0;
  mapping(uint => Contract) public contracts;
  mapping(uint => address) public contractNext;

  struct Contract {
    uint id;
    string content;
    uint linkedAmount;
    address payable author;
    address payable current;
    address payable recipient;
  }

  event ContractCreated (
    uint id,
    string content,
    uint linkedAmount,
    address payable author,
    address payable current,
    address payable recipient
  );

  event ContractMoved (
    uint id,
    string content,
    uint linkedAmount,
    address payable author,
    address payable current
  );

  constructor() public {
    name = "skhiearth";
  }

  function createContract(string memory _content, address payable _next, address payable _end) payable public {
    require(bytes(_content).length > 0, 'Content cannot be empty');
    contractCount++;
    contracts[contractCount] = Contract(contractCount, _content, msg.value, msg.sender, msg.sender, _end);
    contractNext[contractCount] = _next;
    emit ContractCreated(contractCount, _content, msg.value, msg.sender, msg.sender, _end);
  }

  function moveContract(uint _id, address payable _next) public payable {
  // function moveContract(uint _id) public payable {
    require(_id > 0 && _id <= contractCount, 'Id not valid');
    require(contractNext[_id] == msg.sender, 'You are not eligible');
    contractNext[_id] = _next;
    
    Contract memory _contract = contracts[_id]; // Fetch the contract
    address payable _author = _contract.author;
    _contract.current = msg.sender;
    msg.sender.transfer(_contract.linkedAmount);
    contracts[_id] = _contract;

    // Contract memory conTract = contracts[_id];
    // address payable _current = conTract.current;
    // address payable _author = conTract.author; // Fetch the author
    // _current.transfer(conTract.linkedAmount);
    // contracts[_id] = conTract;

    emit ContractMoved(contractCount, _contract.content, _contract.linkedAmount, _author, msg.sender); // Trigger Event
  }
}