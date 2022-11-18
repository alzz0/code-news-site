const AWS = require("aws-sdk");
const { sendResponse, validateInput } = require("../postFunctions");
const dynamodb = new AWS.DynamoDB();
const s3Bucket = new AWS.S3();
module.exports.handler = async (event) => {
  console.log("event:", event);
  try {
    const isValid = validateInput(event.body);
    if (!isValid) {
      return sendResponse(400, { message: "Invalid Input" });
    }

    const { url } = JSON.parse(event.body);
    const { id } = JSON.parse(event.body);
    const parsedBody = JSON.parse(event.body);
    const base64File = parsedBody.file;

    const buf = Buffer.from(
      base64File.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    console.log("buf", buf);

    const data = {
      Key: id,
      Bucket: "imagebucket-alimansour",
      Body: buf,
      ContentType: "image/png",
      ContentEncoding: "base64", // required
    };
    s3Bucket.putObject(data, function (err, data) {
      if (err) {
        console.log("err", err);
        console.log("Error uploading data: ", data);
      } else {
        console.log("successfully uploaded the image!");
      }
    });

    console.log("url: ", url);
    try {
      const params = {
        Item: {
          url: { S: url },
          uploadDate: { S: new Date().getTime().toString() },
        },
        TableName: "postsTable",
      };
      await dynamodb.putItem(params).promise();
    } catch (error) {
      console.log(error);
    }
    return sendResponse(200, {
      message: "Url successfully posted",
    });
  } catch (error) {
    const message = error.message ? error.message : "Internal server error";
    return sendResponse(500, { message });
  }
};
