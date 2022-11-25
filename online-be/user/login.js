const AWS = require("aws-sdk");
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
  console.log("eventbody", event.body);
  try {
    const { email, password } = JSON.parse(event.body);
    const { user_pool_id, client_id } = process.env;

    const params = {
      AuthFlow: "ADMIN_NO_SRP_AUTH",
      UserPoolId: user_pool_id,
      ClientId: client_id,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };

    const data = await cognito.adminInitiateAuth(params).promise();

    const userParams = {
      AccessToken: data.AuthenticationResult.AccessToken,
    };
    const user = await cognito.getUser(userParams).promise();

    const response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ ...data, ...user }),
      isBase64Encoded: false,
    };
    console.log("response: ", response);

    return response;
  } catch (error) {
    console.log("Error logging user in :::", error);
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
