const G = artifacts.require('G');
const GLiquidityPoolManager = artifacts.require('GLiquidityPoolManager');

module.exports = async (deployer) => {
  deployer.link(G, GLiquidityPoolManager);
  await deployer.deploy(GLiquidityPoolManager);
};
