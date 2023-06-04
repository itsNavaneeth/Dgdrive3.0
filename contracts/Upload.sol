// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Upload {
    struct Access {
        address user;
        bool access; // true or false
    }

    struct UrlObject {
        string url1;
        string url2;
    }

    struct UrlObject2 {
        string url1;
    }

    mapping(address => UrlObject[]) value;
    mapping(address => UrlObject2[]) peerValue;
    mapping(address => mapping(address => bool)) ownership;
    mapping(address => Access[]) accessList;
    mapping(address => mapping(address => bool)) previousData;

    function add(
        address _user,
        string memory url1,
        string memory url2
    ) external {
        UrlObject memory newObject = UrlObject(url1, url2);
        value[_user].push(newObject);
    }

    // New function to add peer URL
    function addPeer(address _user, string memory peerUrl1) external {
        UrlObject2 memory newObject = UrlObject2(peerUrl1);
        peerValue[_user].push(newObject);
    }

    function allow(address user) external {
        ownership[msg.sender][user] = true;
        if (previousData[msg.sender][user]) {
            for (uint256 i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == user) {
                    accessList[msg.sender][i].access = true;
                }
            }
        } else {
            accessList[msg.sender].push(Access(user, true));
            previousData[msg.sender][user] = true;
        }
    }

    function disallow(address user) public {
        ownership[msg.sender][user] = false;
        for (uint256 i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = false;
            }
        }
    }

    function display(address _user) external view returns (UrlObject[] memory) {
        require(
            _user == msg.sender || ownership[_user][msg.sender],
            "You don't have access"
        );
        return value[_user];
    }

    // New function to display peer URLs
    function displayPeers(
        address _user
    ) external view returns (Access[] memory) {
        return accessList[_user];
    }

    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }
}
