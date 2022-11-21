const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  console.log("event::", event);
  try {
    const params = {
      TableName: "postsTable",
    };
    const data = await dynamodb.scan(params).promise();

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify(data),
    };
    return response;
  } catch (error) {
    console.log("error::", error);
  }
};
