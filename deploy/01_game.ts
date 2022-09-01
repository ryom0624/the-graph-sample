module.exports = async ({ getNamedAccounts, deployments }: any) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("Game", {
    from: deployer,
    args: [50],
    log: true,
  });
};
module.exports.tags = ["Game"];
