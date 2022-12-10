const AWS = require("aws-sdk");
// var jwt = require("jsonwebtoken");
// var jwkToPem = require("jwk-to-pem");
// var pem = jwkToPem(jwk);
module.exports.handler = async (event) => {
//   console.log("eventbody", event);
//   console.log("jwt", jwt);
  let token = event.authorizationToken || event.headers.Authorization;

  if (token.startsWith("Bearer ")) {
    token = token.substring(7, token.length);
  }
  console.log("token", token);

  try {
    if (
      token.includes("null") ||
      token === "undefined" ||
      token === undefined ||
      token === null ||
      !token
    ) {
      console.log("token2", token);
      const response = JSON.stringify({
        something: "No Token",
      });
      return generatePolicy("user", "Deny", event.methodArn, response);
    } else {
    //   jwt.verify(
    //     token,
    //     pem,
    //     { algorithms: ["RS256"] },
    //     function (err, decodedToken) {
    //       if (err) {
    //         console.log(err);
    //       } else if (decodedToken) {
    //         console.log(decodedToken);
    //       }
    //     }
    //   );

      const response = JSON.stringify({
        something: "Passed auth",
      });

      return generatePolicy("user", "Allow", event.methodArn, response);
    }
  } catch (error) {
    const response = JSON.stringify({
      something: "No Token",
    });
    return generatePolicy("user", "Deny", event.methodArn, response);
  }
};

const generatePolicy = (principalId, effect, resource, data) => {
  // @see https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-lambda-authorizer-output.html
  const authResponse = {
    principalId,
  };

  if (effect && resource) {
    const policyDocument = {
      Version: "2012-10-17",
      Statement: [],
    };

    const statement = {
      Action: "execute-api:Invoke",
      Effect: effect,
      Resource: resource,
    };

    policyDocument.Statement[0] = statement;
    authResponse.policyDocument = policyDocument;
  }

  authResponse.context = {
    stringKey: JSON.stringify(data),
    //role: user.role --> "principalId" could be an object that also has role
  };

  console.log("authResponse", authResponse);

  return authResponse;
};
