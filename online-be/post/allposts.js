const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  console.log("event body::", event.body);
  console.log("event::", event.body.lastItem);
  const parsedEvent = JSON.parse(event.body);

  try {
    let params = {
      TableName: "postsTable",
      Limit: 9,
    };

    if (parsedEvent.lastItem) {
      console.log("lastItem", parsedEvent.lastItem);
      params.ExclusiveStartKey = { id: parsedEvent.lastItem };
    }
    const data = await dynamodb.scan(params).promise();
    console.log("data ", data);
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
