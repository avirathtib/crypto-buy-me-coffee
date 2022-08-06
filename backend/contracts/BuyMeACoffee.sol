// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract BuyMeACoffee {
    struct Coffee {
        address from;
        string name;
        string message;
        uint256 timestamp; 
    }

    event NewCoffee (
        address indexed from,
        string name,
        string message,
        uint256 timestamp
    );

    address payable owner;

    Coffee[] allCoffees;

    constructor() {
        owner = payable(msg.sender);
    }

    function getCoffee() public view returns (Coffee[] memory) {
        return allCoffees;
    }

    function buyCoffee(string memory _name, string memory _message, uint256 _amount) public payable {
        require(_amount > 0, "ETH value cannot be 0 or less than 0");

        allCoffees.push(Coffee(msg.sender, _name, _message, block.timestamp));

        (bool success, ) = owner.call{value: _amount}("");

        require(success, "Transaction failed");

        emit NewCoffee(msg.sender, _name, _message, block.timestamp);
    }

    function withdrawEth() public {
        require(owner.send(address(this).balance));
    }
}
