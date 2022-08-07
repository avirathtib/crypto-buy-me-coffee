const hre = require("hardhat");

const main = async () => {
  const coffeeContractFactory = await hre.ethers.getContractFactory(
    "BuyMeACoffee"
  );
  const coffeeContract = await coffeeContractFactory.deploy();

  await coffeeContract.deployed();

  console.log("Coffee Contract Address", coffeeContract.address);

  let balance = await hre.ethers.provider.getBalance(coffeeContract.address);

  console.log(hre.ethers.utils.formatEther(balance));

  const [owner, tipper] = await hre.ethers.getSigners();

  console.log(owner.address, tipper.address);

  // const tip = { value: hre.ethers.utils.parseEther("0.5") };

  // let prevOwnerBalance = await hre.ethers.provider.getBalance(owner.address);
  // console.log(hre.ethers.utils.formatEther(prevOwnerBalance));

  // let prevTipperBalance = await hre.ethers.provider.getBalance(tipper.address);
  // console.log(hre.ethers.utils.formatEther(prevTipperBalance));

  // await coffeeContract
  //   .connect(tipper)
  //   .buyCoffee("Vitto", "Love zK crushes", tip);

  // await coffeeContract.connect(owner).withdrawEth();

  // let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  // console.log(hre.ethers.utils.formatEther(ownerBalance));

  // let tipperBalance = await hre.ethers.provider.getBalance(tipper.address);
  // console.log(hre.ethers.utils.formatEther(tipperBalance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
