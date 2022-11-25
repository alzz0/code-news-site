const AWS = require("aws-sdk");
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async () => {
  const params = {
    AccessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNDRhMDQ1Yy1iMjBmLTRmMzktODM1MS0wMzk3OGI3MTVlZDIiLCJpc1ZlcmlmaWVkIjpmYWxzZSwiYXVkIjoicGFzc2VzLXVpIiwiaXNzIjoicGFzc2VzLWFwaSIsImlhdCI6MTY2MTgxMTI0NiwiZXhwIjoxNjYxODk3NjQ2fQ.QCNA8B45dWCXHRQyPTEb66-1Kwv0x7c3DSLzs8RsmUg",
  };
  const logout = await cognito.globalSignOut(params).promise();
  console.log("logout:", logout);
};
