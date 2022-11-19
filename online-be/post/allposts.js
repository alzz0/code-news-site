const AWS = require("aws-sdk");
const { sendResponse, validateInput } = require("../postFunctions");
const dynamodb = new AWS.DynamoDB();

module.exports.handler = async (event) => {
  try {
    const isValid = validateInput(event.body);
    if (!isValid) {
      return sendResponse(400, { message: "Invalid Input" });
    }

    const params = {
      TableName: "postsTable",
    };
    const data = await dynamodb.scan(params).promise();
    console.log("data", data);
  } catch (error) {}
};
