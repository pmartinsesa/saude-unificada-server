export default () => ({
  port: process.env.PORT,
  web3Url: process.env.WEB3_URL,
  smartContractAddress: process.env.SMART_CONTRACT_ADDRESS,
  abi: process.env.ABI
});

