# Solidify

Solidify semi-structured data on EVM-compatible blockchains for educational purposes.

- Semi-structured record persistence
- On-chain **CRUD** operations
- Role-based access control
- Upgradable contracts

## Testing

Run command

```shell
npm run test
```

## Deployment

### Local

1. Start up Hardhat network

```shell
npx hardhat node
```

2. Run command to deploy

```shell
npm run deploy_local
```

### Sepolia

1. Set up [Infura](https://www.infura.io/) API key and [Sepolia](https://sepolia.etherscan.io/) account private key
   in `hardhat.config.ts`
2. Run command

```shell
npm run deploy_sepolia
```

---

## References

- [Hardhat](https://hardhat.org/)
- [OpenZeppelin](https://www.openzeppelin.com/)