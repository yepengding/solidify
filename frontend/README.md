# Solidify Frontend

A Solidify frontend implemented in Next.js for interacting with deployed Solidify smart contracts.

## Quickstart

1. Initialize a network with [Solidify](https://github.com/yepengding/solidify) deployed
2. Set environment variables in `.env`, referring
   to [Next.js environment variables](https://nextjs.org/docs/basic-features/environment-variables) for customization.

3. Invoke Solidify contract methods.

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
