const AWS = require('aws-sdk');
const stepFunctions = new AWS.StepFunctions();

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };
};

module.exports.init = (event, context, callback) => {
  const params = {
    stateMachineArn: 'arn:aws:states:us-east-1:XXXAWSACCOUNTXXX:stateMachine:XXXSTATEMACHINENAMEXXX',
    name: 'Execution-Lambda2'
  }

  stepFunctions.startExecution(params, (err, data) => {
    if(err) {
      console.log(err);

      const response = {
        statusCode: 500,
        body: JSON.stringify({
          message: 'There was an error'
        })
      };
      
      callback(null, response);
    } else {
      console.log(data);
      
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Step function worked'
        }),
      };

      callback(null, response);
    }
  });
};