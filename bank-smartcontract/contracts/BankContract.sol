//SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Bank {

    //state variables (cost gas)
    address public bankOwner;
    string public bankName;

    mapping(address => uint256) public customerBalance;

    constructor(){
        bankOwner = msg.sender;
    }


    function depositMoney() public payable{
        require(msg.value != 0, "You need to send more funds!");
        customerBalance[msg.sender] += msg.value;
    }

    function setBankName(string memory _name) external{
        require(msg.sender == bankOwner, "You are not authorized for this action");
        bankName = _name;
    }

    function withdrawMoney(address payable _to, uint256 _amount) public payable{
        require(_amount <= customerBalance[msg.sender] , "You don't have sufficient balance for this transaction");
        customerBalance[msg.sender] -= _amount;
        _to.transfer(_amount);
    }

    function getCustomerBalance() public view returns (uint256) {
        return customerBalance[msg.sender];
    }

    function getBankBalance() public view returns (uint256) {
        require(msg.sender == bankOwner, "You are not authorized for this action");
        return address(this).balance;
    }
}