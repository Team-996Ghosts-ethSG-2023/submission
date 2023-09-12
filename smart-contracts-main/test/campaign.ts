const { expect } = require("chai");
import { ethers } from "hardhat";

describe("campaign contract contract", function () {
  it("Fully passing test case", async function () {
    const [deployer, sponsor, user, maker] = await ethers.getSigners();
  
    const Token = await ethers.getContractFactory("MockErc20", deployer);
    const token = await Token.deploy();
    const tokenAddress = await token.getAddress();
    console.log("Token address:", tokenAddress);
  
    const taskAmount = 5000;
    token.mint(sponsor.address, taskAmount);
  
    const Campaign = await ethers.getContractFactory("Campaign", deployer);
    console.log("deployer", deployer.address)
    const campaign = await Campaign.deploy(deployer.address);
    await campaign.grantSponsor(sponsor.address);
    await campaign.grantMaker(maker.address);
  
    await token.connect(sponsor).increaseAllowance(await campaign.getAddress(),taskAmount);
  
    const campaignDescription = "1 push up";
    const rewardPool = 5000 ;
    const rewardPerCompletedTask = 30;
  
    await campaign.connect(sponsor).addNewTask(tokenAddress,campaignDescription, rewardPool, rewardPerCompletedTask);
    console.log("added new task")
    const taskId =0;
    const mockIPFSLink="mockIPFSLink";
    await campaign.connect(user).addNewCompletedTask(taskId, mockIPFSLink);
    console.log("completed new task")
  
    await campaign.connect(maker).approveCompletedTask(taskId, user.address);
    console.log("approved task")
  
    const newBalance = await token.balanceOf(user.address)
    console.log("new balance of user after campaign milestone approved", newBalance);
    expect(newBalance).to.equal(rewardPerCompletedTask);
  });
});