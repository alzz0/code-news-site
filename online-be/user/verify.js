var jwt = require("jsonwebtoken");
const AWS = require("aws-sdk");
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
  console.log("event", event);

  const parsedEvent = JSON.parse(event.body);
  const { refreshToken, accessToken, idtoken, email } = parsedEvent;
  const { user_pool_id, client_id } = process.env;

  const params = {
    AuthFlow: "REFRESH_TOKEN_AUTH",
    UserPoolId: user_pool_id,
    ClientId: client_id,

    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
    },
  };

  try {
    const data = await cognito.adminInitiateAuth(params).promise();
    console.log("data", data);

    const response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        //verified: true,
        message: "success",
        accessToken: data.AuthenticationResult,
      }),
    };
    console.log("response: ", response);

    return response;
  } catch (error) {
    console.log(error);
  }
};
