// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 public favoriteNumber;

    mapping(string => uint256) public nameToFavoriteNumber;

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    People[] public people;

    function store(uint256 _favoriteNumber) public virtual {
        //make favorite number to be equal to the args passed in store function
        favoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns (uint256) {
        //get the favorite number value
        return favoriteNumber;
    }

    //add person to the people array
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name));
        //get the person favorite number by mappin with name as a key
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}
