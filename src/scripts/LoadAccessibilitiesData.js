let AWS = require('aws-sdk');
let fs = require('fs');

AWS.config.update({
  region: 'ap-southeast-1',
});

console.log('Writing entries to Accessibilities table.');

let dynamodb = new AWS.DynamoDB.DocumentClient();
let accessibilitiesData = JSON.parse(
  fs.readFileSync('./src/components/data/accessibilities.json', 'utf8')
);

accessibilitiesData.forEach(function (accessibililty) {
  let params = {
    TableName: 'Accessibilities',
    Item: {
      name: accessibililty.name,
    },
  };

  dynamodb.put(params, function (err, data) {
    if (err)
      console.error(
        'Unable to load data into table for accessibility',
        accessibililty.name,
        '. Error: ',
        JSON.stringify(err, null, 2)
      );
    else console.log('Added', accessibililty.name, 'to table.');
  });
});
