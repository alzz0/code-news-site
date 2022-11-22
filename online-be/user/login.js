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
    console.log("data: ", data);
    const response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(data.AuthenticationResult.IdToken),
      isBase64Encoded: false,
    };
    console.log("response: ", response);

    return response;
  } catch (error) {
    console.log("Error logging user in :::", error);
    const message = error.message ? error.message : "Internal server error";
    // return sendResponse(500, { message });
  }
};
