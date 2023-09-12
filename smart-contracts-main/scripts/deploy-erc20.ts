import { ethers } from "hardhat";

async function main() {
if (process.env.PK && process.env.SPONSOR_PK && process.env.MAKER_PK && process.env.USER_PK){
    const deployer = new ethers.Wallet(process.env.PK,ethers.provider)
    const sponsor = new ethers.Wallet(process.env.SPONSOR_PK,ethers.provider)
    const user = new ethers.Wallet(process.env.USER_PK,ethers.provider)
    const maker = new ethers.Wallet(process.env.MAKER_PK,ethers.provider)
    console.log(deployer.address, sponsor.address, maker.address)
    console.log("ethers.provider", ethers.provider)

    const Token = await ethers.getContractFactory("MockErc20", deployer);
    const token = await Token.deploy();
    const tokenAddress = await token.getAddress();
    console.log("Token address:", tokenAddress);
  
    const taskAmount = 5000;
    await token.mint(sponsor.address, taskAmount, {gasLimit: 2100000,gasPrice: 300000000000});
  
    const Campaign = await ethers.getContractFactory("Campaign", deployer);
    console.log("deployer", deployer.address)
    const campaign = await Campaign.deploy(deployer.address);

    console.log("campaign address:", await campaign.getAddress());
    await campaign.grantSponsor(sponsor.address,  {gasLimit: 2100000,gasPrice: 300000000000});
    await campaign.grantMaker(maker.address);
    console.log("grant permission");
  
    await token.connect(sponsor).increaseAllowance( await campaign.getAddress(),taskAmount);
    console.log("sponsor's allowance increased for them to be able to submit erc20 reward later.")

        const campaignDescription = "1 push up";
        const rewardPool = 1000 ;
        const rewardPerCompletedTask = 30;


        await campaign.connect(sponsor).addNewTask(tokenAddress,campaignDescription, rewardPool, rewardPerCompletedTask,  {gasLimit: 2100000,gasPrice: 300000000000});
        console.log("added new task")
        const taskId =0;
        const mockIPFSLink="mockIPFSLink";
        await campaign.connect(user).addNewCompletedTask(taskId, mockIPFSLink , {gasLimit: 2100000,gasPrice: 300000000000});
        console.log("completed new task")

        await campaign.connect(maker).approveCompletedTask(taskId, user.address,  {gasLimit: 2100000,gasPrice: 300000000000});
        console.log("approved task")

        const newBalance = await token.balanceOf(user.address)
        console.log("new balance of user after campaign milestone approved", newBalance, {gasLimit: 2100000,gasPrice: 300000000000});
}
  

}
main();