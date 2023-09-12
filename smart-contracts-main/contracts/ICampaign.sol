// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICampaign {
    struct CompletedTaskDetails {
        string ipfsLink;    //videoUrl
        uint256 submittedDate;
        bool approved;
    }

    struct Task {
        string description;
        uint256 deadline;
        uint256 rewardPool;
        uint256 rewardPerCompletedTask;
        uint256 utilisedReward;
        address erc20TokenPayout;
        mapping(address => CompletedTaskDetails) completedTasks;
    }

    function grantSponsor(address sponsor) external;
    function grantMaker(address maker) external;
    function addNewTask(address erc20TokenPayout, string calldata description, uint256 rewardPool, uint256 rewardPerCompletedTask) external;
    function addNewCompletedTask(uint256 taskId, string calldata ipfsLink) external;
    function approveCompletedTask(uint256 taskId, address userAddress) external;

    event NewSponsorEvent(address sponsor);
    event NewTaskEventEvent(address sponsor, uint256 taskId);
    event NewCompletedTaskEvent(address sponsor, uint256 taskId, address userAddress);
    event ApproveCompletedTaskEvent(address sponsor, uint256 taskId, address userAddress);
}