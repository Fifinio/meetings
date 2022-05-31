# Endpoints

## `POST` Method `/users`
register a user
#### REQUEST BODY
```json
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "s3cr3tp4ssw0rd"
}
```

#### RESPONSE `201 Created`
```json
{
    "id": "5b02d038b63603d1ca69729"
}
```

## `POST` Method `/auth`
generate a jwt token
#### REQUEST BODY
```json
{
    "email": "john@example.com",
    "password": "s3cr3tp4ssw0rd"
}
```
#### RESPONSE `201 Created`



