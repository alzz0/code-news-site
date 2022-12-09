const AWS = require("aws-sdk");

const generatePolicy = function(principalId, effect, resource) {
    const authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
        const policyDocument = {};
        policyDocument.Version = '2012-10-17';
        policyDocument.Statement = [];
        const statementOne = {};
        statementOne.Action = 'execute-api:Invoke';
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    console.log(authResponse)
    return authResponse;
};
// const generatePolicy = ({ allow }) => {
//   return {
//       principalId: 'token',
//       policyDocument: {
//           Version: '2012-10-17',
//           Statement: {
//               Action: 'execute-api:Invoke',
//               Effect: allow ? 'Allow' : 'Deny',
//               Resource: '*',
//           },
//       },
//   };
// };

module.exports.profile = (event, context, callback) => {
  console.log('event',event)
    const body = {
        message: 'Successs - Profile Retrieved!',
        input: event,
    };
    console.log('body',body)

      const response = {
        statusCode:200,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
      return response;
    };
    


module.exports.auth = (event, context, callback) => {

    console.log(event);
    console.log("==================");
    console.log("Authorization: ", event.authorizationToken);
    console.log("==================");

    var token = event.authorizationToken;
    if (!token) {
      console.log('could not find a token on the event');
      callback(null,generatePolicy({ allow: false }))
  }
//   if (authHeader.startsWith("Bearer ")){
//     token = authHeader.substring(7, authHeader.length);
// }

callback(null,generatePolicy('user', 'Allow', event.methodArn))
    // switch (token) {
    //   case true:
    //     callback(null, generatePolicy('user', 'Allow', event.methodArn));
    //     break;
    //     case 'deny':
    //       callback(null, generatePolicy('user', 'Deny', event.methodArn));
    //       break;
    //       case 'unauthorized':
    //         callback('Unauthorized');
    //         break;
    //         default:
    //           callback('Error');
    //         }

// console.log(item)
// const body={}
//       const response = {
//         statusCode:200,
//         body: JSON.stringify(body),
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Credentials": true,
//         },
//       };
//       return response;
    };
