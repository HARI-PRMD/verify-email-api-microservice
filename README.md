# Email Verification Code Sending API Microservice

Simple Express API for sending verification codes to emails using nodemailer,
which can be checked for validity in the frontend of any application or other services.

## Routes

### `/verify`

Takes in 3 headers

- email
- name
- purpose

and responds with

```typescript
{
  "status": boolean,
  "messageId": string,
  "verificationCode": string
}
```

### `/health`

responds with the status of the API health

```typescript
{
  status: string
}
```

### `/`

responds with the Purpose of the API

```json
{
  "purpose": "Email Verification Service API"
}
```

## How to Setup

run the following commands

### Initial Setup

```console
$ git clone git@github.com:HARI-PRMD/verify-email-api.git
$ cd verify-email-api/
$ npm install
```

### Setting up environment variables

Create a `.env` file

```.env
PORT="3000"
# nodemailer auth
EMAIL_ID="example@gmail.com"
EMAIL_PASSWORD="app_password"
```

create any regular gmail account and follow these steps to get an `EMAIL_PASSWORD`: [https://stackoverflow.com/a/72477193](https://stackoverflow.com/a/72477193)

then depending on your need, run the following commands

### Running the API

```console
$ npm run build
$ npm run start
```

or

### Further working on the API

```console
$ npm run dev
```
