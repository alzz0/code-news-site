const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  console.log("event body::", event.body);
  console.log("event::", event.body.lastItem);
  const parsedEvent = JSON.parse(event.body);

  try {
    let params = {
      TableName: "communityPostsTable",
      Limit: 28,
      FilterExpression: "#uploadDate > :uploadDate",
      ExpressionAttributeValues: { ":uploadDate": 1 },
      ExpressionAttributeNames: { "#uploadDate": "uploadDate" },
    };

    if (parsedEvent.lastItem) {
      params.ExclusiveStartKey = parsedEvent.lastItem;
    }
    const data = await dynamodb.scan(params).promise();

    const lastEvaluatedKey = data.LastEvaluatedKey;

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify(data, { lastItem: lastEvaluatedKey }),
    };
    return response;
  } catch (error) {
    console.log("error::", error);
  }
};
