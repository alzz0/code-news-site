const sendResponse = (statusCode, body) => {
  const response = {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
  return response;
};

const validateInput = (data) => {
  console.log("data", data);
  const body = JSON.parse(data);
  console.log("bodyvalid:", body);
  const { url } = body;
  if (!url) return false;
  return true;
};

module.exports = {
  sendResponse,
  validateInput,
};
