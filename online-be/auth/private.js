const AWS = require("aws-sdk");

const { sendResponse, validateInput } = require("../userFunctions");
module.exports.handler = async (event) => {
  console.log("eventbody", event.body);
  try {
    const response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: 'success',
      isBase64Encoded: false,
    };
    console.log("response: ", response);

    return response;
  } catch (error) {
    console.log(error)
    const response = {
        statusCode: 400,

        body: JSON.stringify(error),
      };
      console.log("response: ", response);
  
      return response;
  }
};
