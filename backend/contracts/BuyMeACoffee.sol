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

    function buyCoffee(string memory _name, string memory _message) public payable {
        // Must accept more than 0 ETH for a coffee.
        require(msg.value > 0, "can't buy coffee for free!");

        // Add the memo to storage!
        allCoffees.push(Coffee(
            msg.sender,
            _name,
            _message,
            block.timestamp
        ));

        // Emit a NewMemo event with details about the memo.
        emit NewCoffee(
            msg.sender,
            _name,
            _message,
            block.timestamp
        );
    }

    function withdrawEth() public {
        require(owner.send(address(this).balance));
    }
}
