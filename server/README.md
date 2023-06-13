This is the server folder of the project, Make sure to view the [client](../client/README.md) folder as well

## Local Set Up

1 - Install the deps:
`npm install` or `yarn add`

2 - Create a `default.ts` file inside `config` folder:

```typescript
export default {
  port: process.env.PORT || 8000,
  hashSalt: 10,

  jwt: {
    secret: "any secret",
    expireTime: "4d",
  },

  dbURI: {
    local: "local mongodb",
    remote: "remote mongodb",
  },

  mongoose: {
    encKey: "a 32 byte random string, use OpenSSL",
    signKey: `a 64 byte random string, use OpenSSL`,
  },

  oauth: {
    google: {
      CLIENT_ID: "",
      CLIENT_SECRET: "",
      CALLBACK_URL: "/api/auth/google/callback",
    },

    github: {
      CLIENT_ID: "",
      CLIENT_SECRET: "",
      CALLBACK_URL: "/api/auth/github/callback",
    },
  },

  client: {
    URL: "http://localhost:3000",
    LOGIN_URL: "http://localhost:3000/login",
  },

  // for reset password email
  smtp: {
    host: "",
    port: 587,
    user: "",
    pass: "",
  },
};
```

3 - run the command:
`npm run dev` or `yarn dev`
