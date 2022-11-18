//const { CognitoIdentityServiceProvider } = require("aws-sdk");
const AWS = require("aws-sdk");
const { sendResponse, validateInput } = require("../functions");
const cognito = new AWS.CognitoIdentityServiceProvider();
const dynamodb = new AWS.DynamoDB();
module.exports.handler = async (event) => {
  try {
    const isValid = validateInput(event.body);

    if (!isValid) {
      return sendResponse(400, { message: "Invalid Input" });
    }

    const { email, password } = JSON.parse(event.body);
    const { user_pool_id } = process.env;

    const params = {
      UserPoolId: user_pool_id,
      Username: email,
      UserAttributes: [
        {
          Name: "email",
          Value: email,
        },
        {
          Name: "email_verified",
          Value: "true",
        },
      ],
      MessageAction: "SUPPRESS",
    };

    const response = await cognito.adminCreateUser(params).promise();

    if (response.User) {
      const paramsForSetPass = {
        Password: password,
        UserPoolId: user_pool_id,
        Username: email,
        Permanent: true,
      };
      await cognito.adminSetUserPassword(paramsForSetPass).promise();
      const date = new Date().getTime();
      try {
        const paramsforDB = {
          Item: {
            id: { S: date.toString() },
            email: { S: email },
            username: { S: " " },
            createdAt: { S: new Date().toISOString().toString() },
          },
          TableName: "usersTable",
        };
        await dynamodb.putItem(paramsforDB).promise();
      } catch (error) {
        console.log(error);
      }

      return sendResponse(200, {
        message: "User registration successful",
      });
    }
  } catch (error) {
    const message = error.message ? error.message : "Internal server error";
    return sendResponse(500, { message });
  }
};
