const AWS = require("aws-sdk");
const cognito = new AWS.CognitoIdentityServiceProvider();
exports.handler = (event, context, callback) => {
    console.log(event)
    // Set the us er pool autoConfirmUser flag after validating the email domain
    event.response.autoConfirmUser = true;

if(event.request.userAttributes.hasOwnProperty('email')){
    event.response.autoVerifyEmail = true
}

    // Split the email address so we can compare domains
    // var address = event.request.userAttributes.email.split("@")
    
    // // This example uses a custom attribute "custom:domain"
    // if (event.request.userAttributes.hasOwnProperty("custom:domain")) {
    //     if ( event.request.userAttributes['custom:domain'] === address[1]) {
    //         event.response.autoConfirmUser = true;
    //         console.log('event',event)
    //     }
    // }

    // Return to Amazon Cognito
    callback(null, event);
};