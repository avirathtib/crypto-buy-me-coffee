require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/4FWGwe_2EtG7fqaOVY3DTvYVbYPF0M9T",
      accounts: [
        "4af938cda8effb8f79f659e25aa1c48bbad15ae32d149ae1110b8e8a7bf8ce72",
      ],
    },
  },
};
