const env = {
    web3Provider: process.env.NEXT_PUBLIC_WEB3_PROVIDER || "",
    contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
    account: {
        address: process.env.NEXT_PUBLIC_ACCOUNT_ADDRESS || "",
        privateKey: process.env.NEXT_PUBLIC_ACCOUNT_PRIVATE_KEY || ""
    }
}

export default env;
