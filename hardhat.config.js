require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
//   defaultNetwork: "polygon_mumbai",
//    networks: {
//       hardhat: {},
//       polygon_mumbai: {
//          url: "https://polygon-mumbai.g.alchemy.com/v2/WcgWcPAVj0lJgIUVKOwgjedrQ-JkPSPk",
//          accounts: ["6fb003462f2d4302082491eef3e9ae25ea2e7ecab0a43634abf15a6fa963ff04"]
//       }
//    },
};


// Deploying contracts with the account: 0x6CCA85eE0C115b83B8ebf705df09f93aBD47338f
// Account balance: 367953434448926968
// Market Place Address: 0x4d1E18F0BA11600141C6D09Becf8Ece5985f3C8d