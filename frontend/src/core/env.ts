const env = {
    web3Provider: process.env.WEB3_PROVIDER || "",
    contractAddress: process.env.CONTRACT_ADDRESS || "",
    account: {
        address: process.env.ACCOUNT_ADDRESS || "",
        privateKey: process.env.ACCOUNT_PRIVATE_KEY || ""
    }
}

export default env;
