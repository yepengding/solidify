# Solidify Frontend

A Solidify frontend implemented in Next.js for interacting with deployed Solidify smart contracts.

## Quickstart

### Environment Setting

1. Initialize a network with [Solidify](https://github.com/yepengding/solidify) deployed
2. Set environment variables in `.env`, referring
   to [Next.js environment variables](https://nextjs.org/docs/basic-features/environment-variables) for customization.

### Startup

```shell
npm run dev
```

### GUI

Invoke Solidify contract methods by interacting with GUI.

http://localhost:3000/record

### API

Invoke Solidify contract methods by calling APIs.

- Create

```shell
curl --location 'http://localhost:3000/api/record/create' \
--header 'Content-Type: application/json' \
--data '{
    "id": 1,
    "content": "Create record"
}'
```

- Retrieve

```shell
curl --location 'http://localhost:3000/api/record/retrieve/1'
```

- Update

```shell
curl --location 'http://localhost:3000/api/record/update' \
--header 'Content-Type: application/json' \
--data '{
    "id": 1,
    "content": "Update record"
}'
```

- Erase (Delete)

```shell
curl --location --request POST 'http://localhost:3000/api/record/erase/1'
```

---

# References

- [Next.js](https://nextjs.org/)
