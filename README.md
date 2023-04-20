# Solidify

Solidify semi-structured data on EVM-compatible blockchains for educational purposes.

- [x] Semi-structured record persistence
- [x] On-chain **CRUD** operations
- [x] Non-fungible token issuing
- [x] Role-based access control
- [x] Upgradable contracts
- [x] Frontend

## Quickstart

Install dependencies.

```shell
npm install
```

### Testing

Run command

```shell
npm run test
```

### Deployment

#### Local

1. Start up Hardhat network

```shell
npx hardhat node
```

2. Run command to deploy normal version

```shell
npm run deploy -- --network localhost
```

or upgradable version

```shell
npm run deploy_proxy -- --network localhost

```

#### Sepolia

1. Set up [Infura](https://www.infura.io/) API key and [Sepolia](https://sepolia.etherscan.io/) account private key
   in `hardhat.config.ts`
2. Run command to deploy normal version

```shell
npm run deploy -- --network sepolia
```

or upgradable version

```shell
npm run deploy_proxy -- --network sepolia
```

---

## References

- [Hardhat](https://hardhat.org/)
- [OpenZeppelin](https://www.openzeppelin.com/)