///SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; 
import {ICampaign} from './ICampaign.sol';
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Campaign is ICampaign, AccessControl {
    bytes32 sponsorRole = keccak256(abi.encodePacked("SPONSOR_ROLE"));
    bytes32 makerRole = keccak256(abi.encodePacked("MAKER_ROLE"));
    uint256 private largestTaskid;

    // mapping(address => uint256) private mapSponsorToTaskId;
    mapping(address => mapping(uint256 => bool)) private mapSponsorToTaskId;    //sponsor -> taskId -> true
    
    // mapping(address => ) tasks; // sponsor => taskId => task
    mapping(uint256 => Task) private tasks; //map to global task id

    constructor(address admin){
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
    }

    modifier isAdmin(address msgSender){
        hasRole(DEFAULT_ADMIN_ROLE, msgSender);
        _;
    }

    modifier isSponsor(address msgSender){
        hasRole(sponsorRole, msgSender);
        _;
    }

    modifier isMaker(address msgSender){
        hasRole(makerRole, msgSender);
        _;
    }

    function grantSponsor(address sponsor) isAdmin(msg.sender) external {
        _grantRole(sponsorRole, sponsor);
    }

    function grantMaker(address maker)  isAdmin(msg.sender)  external {
        _grantRole(makerRole, maker);
    }

    function addNewTask(address erc20TokenPayout, string calldata description, uint256 rewardPool, uint256 rewardPerCompletedTask) isSponsor(msg.sender) external{
        IERC20(erc20TokenPayout).transferFrom(msg.sender, address(this), rewardPool);
        uint256 currentTaskId = largestTaskid;
        createNewTask(largestTaskid, description, rewardPool, rewardPerCompletedTask, erc20TokenPayout);
        mapSponsorToTaskId[msg.sender][currentTaskId] = true;
        // uint256 currentTaskId = mapSponsorToCurrentTaskId[msg.sender];
        // tasks[msg.sender][currentTaskId] =  Task({
        //     description: description, 
        //     rewardPool: rewardPool, 
        //     rewardPerCompletedTask: rewardPerCompletedTask,
        //     erc20TokenPayout: erc20TokenPayout
        //     });
        // tasks[currentTaskId] = createNewTask(description, rewardPool, rewardPerCompletedTask, erc20TokenPayout);
        //increment taskId 
        currentTaskId++;
    }

    // function assignNewIdToTask(string calldata description, uint256 rewardPool, uint256 rewardPerCompletedTask, address erc20TokenPayout) internal returns(Task storage){
    //     Task storage task;
    //     task.description = description;
    //     task.rewardPool = rewardPool;
    //     task.rewardPerCompletedTask = rewardPerCompletedTask;
    //     task.erc20TokenPayout = erc20TokenPayout;
    //     return task;
    // }


    function createNewTask(uint256 currentTaskId, string calldata description, uint256 rewardPool, uint256 rewardPerCompletedTask, address erc20TokenPayout) internal {
        Task storage task = tasks[currentTaskId];
        task.description = description;
        task.rewardPool = rewardPool;
        task.rewardPerCompletedTask = rewardPerCompletedTask;
        task.erc20TokenPayout = erc20TokenPayout;
    }

    // function addNewCompletedTask(address sponsor, uint256 taskId, string calldata ipfsLink) external {
    //     address userAddress = msg.sender;
    //     require(tasks[sponsor][taskId].completedTasks[userAddress].submittedDate == 0, "user has already completed this task once.");
    //     uint256 rewardPerCompletedTask = tasks[sponsor][taskId].rewardPerCompletedTask;
    //     uint256 utilisedReward = tasks[sponsor][taskId].utilisedReward;
    //     require(tasks[sponsor][taskId].rewardPool - utilisedReward > rewardPerCompletedTask, "reward pool has been depleted. do not allow new completion of tasks.");
    //     tasks[msg.sender][taskId].completedTasks[msg.sender] = new CompletedTaskDetails({
    //         ipfsLink: ipfsLink,
    //         submittedDate: block.timestamp
    //     });
    // }

    function addNewCompletedTask(uint256 taskId, string calldata ipfsLink) external {
        address userAddress = msg.sender;
        require(tasks[taskId].completedTasks[userAddress].submittedDate == 0, "user has already completed this task once.");
        uint256 rewardPerCompletedTask = tasks[taskId].rewardPerCompletedTask;
        uint256 utilisedReward = tasks[taskId].utilisedReward;
        require(tasks[taskId].rewardPool - utilisedReward > rewardPerCompletedTask, "reward pool has been depleted. do not allow new completion of tasks.");
        completeTask(ipfsLink);
        // tasks[taskId].completedTasks[msg.sender] = new CompletedTaskDetails({
        //     ipfsLink: ipfsLink,
        //     submittedDate: block.timestamp
        // });
    }

    function completeTask(string calldata ipfsLink) internal {
        uint256 currentTaskId = largestTaskid;
        Task storage task = tasks[currentTaskId];
        task.completedTasks[msg.sender] =  CompletedTaskDetails({
            ipfsLink: ipfsLink,
            submittedDate: block.timestamp,
            approved: false
        });
    }

    // function approveCompletedTask(address sponsor, uint256 taskId, address userAddress) isMaker(msg.sender) external {
    //     uint256 rewardPerCompletedTask = tasks[sponsor][taskId].rewardPerCompletedTask;
    //     uint256 utilisedReward = tasks[sponsor][taskId].utilisedReward;
    //     require(tasks[sponsor][taskId].rewardPool - utilisedReward > rewardPerCompletedTask, "reward pool has been depleted. unable to approve more tasks.");
    //     require(tasks[sponsor][taskId].completedTasks[userAddress].approved == false, "task has already been approved.");
        
    //     tasks[sponsor][taskId].utilisedReward = utilisedReward + rewardPerCompletedTask;
    //     tasks[sponsor][taskId].completedTasks[userAddress].approved = true;
    //     // perform payout to user
    //     IERC20(tasks[sponsor][taskId].erc20TokenPayout).transfer(userAddress, rewardPerCompletedTask);
    // }

     function approveCompletedTask(uint256 taskId, address userAddress) isMaker(msg.sender) external {
        uint256 rewardPerCompletedTask = tasks[taskId].rewardPerCompletedTask;
        uint256 utilisedReward = tasks[taskId].utilisedReward;
        require(tasks[taskId].rewardPool - utilisedReward > rewardPerCompletedTask, "reward pool has been depleted. unable to approve more tasks.");
        require(tasks[taskId].completedTasks[userAddress].approved == false, "task has already been approved.");
        
        tasks[taskId].utilisedReward = utilisedReward + rewardPerCompletedTask;
        tasks[taskId].completedTasks[userAddress].approved = true;
        // perform payout to user
        IERC20(tasks[taskId].erc20TokenPayout).transfer(userAddress, rewardPerCompletedTask);
    }

}