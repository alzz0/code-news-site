const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  console.log("event body::", event.body);
  const parsedEvent = JSON.parse(event.body);
  console.log("event starting key ::", parsedEvent.lastItem);

  try {
    let params = {
      TableName: "postsTable1",
      IndexName: parsedEvent.secondaryIndex,
      KeyConditionExpression: "#type = :type",
      ExpressionAttributeNames: { "#type": "type" },
      ExpressionAttributeValues: { ":type": "posts" },
      ScanIndexForward: false,
      Limit: 28,
    };

    if (parsedEvent.lastItem) {
      params.ExclusiveStartKey = parsedEvent.lastItem;
    }
    const data = await dynamodb.query(params).promise();
    console.log("data", data);

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
