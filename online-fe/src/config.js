const config = {
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://rz2sslew69.execute-api.us-east-1.amazonaws.com/dev/",
  },
  cognito: {
    REGION: "YOUR_COGNITO_REGION",
    USER_POOL_ID: "YOUR_COGNITO_USER_POOL_ID",
    APP_CLIENT_ID: "YOUR_COGNITO_APP_CLIENT_ID",
    IDENTITY_POOL_ID: "YOUR_IDENTITY_POOL_ID",
  },
};

export default config;
