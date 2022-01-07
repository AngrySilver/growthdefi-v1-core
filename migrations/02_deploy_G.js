const G = artifacts.require('G');
const GC = artifacts.require('GC');

module.exports = async (deployer) => {
  await deployer.deploy(G);
  await deployer.deploy(GC);
};
