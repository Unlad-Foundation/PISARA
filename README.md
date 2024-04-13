# UNLAD Template Service (API)

Welcome to the UNLAD Template Service API documentation

## Setup

1.  Clone the repository
    `git clone https://github.com/Unlad-Foundation/unlad-template-service`
2.  Install dependencies
    `npm install`
3.  Run local server
    `node index.js`

## Running Tests

1. Install Postman for PCs/Mac (or use Postman for Web https://web.postman.co/)
2. Import the `UNLAD TEMPLATE SERVICE (API).postman_collection.json` file from the repository
3. Click the "UNLAD TEMPLATE API" collection name and update the following on the "Variables" tab: - `base_url`: `localhost:5000` or `UNLAD_TEST_API_URL` - `token`: retrieved when you login via the UNLAD TEMPLATE API

## User Registration (new API user)

Click the `POST - Create` request under the "User" folder, switch to the "Body" tab and add a "raw" JSON into the editor then click send.

```
{
    "email":  "gab@lmighty.com",
    "password":  "abcd1234!"
}
```

## User Login (generate session token)

Click the `POST - Login` request under the "User" folder, switch to the "Body" tab and add a "raw" JSON into the editor then click send.

```
{
    "email":  "gab@lmighty.com",
    "password":  "abcd1234!"
}
```

The response body from the API should return your access token. Update your workspace collection "token" variable with this token

```
{
"accessToken":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxOTIyZDZhMTk1ZmY1OTQzMzI1YTY4IiwiZW1haWwiOiJnYWJhbG1pZ2h0eUBnbWFpbC5jb20ifSwiaWF0IjoxNzEyOTI0MjU2LCJleHAiOjE3MTMwMTA2NTZ9.k0YhxdVEPhKSAtlRI2DV8Soy6Yd65ME4zNaiCkj4sfI"
}
```

## REST Calls Example

Visit the documentation - https://documenter.getpostman.com/view/30947035/2sA3Bhfv5k
