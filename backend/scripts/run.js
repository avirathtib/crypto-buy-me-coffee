const hre = require("hardhat");
const main = async () => {
  const coffeeContractFactory = await hre.ethers.getContractFactory(
    "BuyMeACoffee"
  );
  const coffeeContract = await coffeeContractFactory.deploy();
  await coffeeContract.deployed();
  console.log("Coffee Contract deployed to:", coffeeContract.address);

  const [owner] = await hre.ethers.getSigners();
  const [tipper] = await hre.ethers.getSigners();

  let contractBalance = await hre.ethers.provider.getBalance(
    coffeeContract.address
  );
  let prevOwnerBalance = await hre.ethers.provider.getBalance(owner.address);

  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  console.log("Owner balance:", hre.ethers.utils.formatEther(prevOwnerBalance));

  const tip = { value: hre.ethers.utils.parseEther("0.05") };

  const coffeeTxn = await coffeeContract
    .connect(tipper)
    .buyCoffee("Megha", "This is Coffee #1", tip);
  await coffeeTxn.wait();

  let newContractBalance = await hre.ethers.provider.getBalance(
    coffeeContract.address
  );
  await coffeeContract.connect(owner).withdrawEth();

  let newOwnerBalance = await hre.ethers.provider.getBalance(owner.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(newContractBalance)
  );

  console.log("Owner balance:", hre.ethers.utils.formatEther(newOwnerBalance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
