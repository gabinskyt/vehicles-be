var generatePolicy = function(principalId, effect, resource) {
    var authResponse: any = {};

    authResponse.principalId = principalId;
    if (effect && resource) {
        let statementOne = {
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: resource
        };
        let policyDocument = {
            Version: '2012-10-17',
            Statement: [],
        }
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }

    return authResponse;
}

export const getAuth = async (event, _context, callback) => {
    const token = event.authorizationToken;
    switch (token) {
        case 'allow':
            callback(null, generatePolicy('user', 'Allow', event.methodArn));
            break;
        case 'deny':
            callback(null, generatePolicy('user', 'Deny', event.methodArn));
            break;
        case 'unauthorized':
            callback("Unauthorized");
            break;
        default:
            callback("Error: Invalid token");
    }
};