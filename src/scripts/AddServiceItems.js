let AWS = require('aws-sdk');

AWS.config.update({
  region: 'ap-southeast-1',
});

let dynamodb = new AWS.DynamoDB();

let items = [
  { name: 'Indoor pool' },
  { name: '24-hour fitness center' },
  { name: 'Massage therapy' },
  { name: 'Full service spa' },
  { name: 'In-room jacuzzi tubs' },
  { name: 'Rooftop café  &amp; smoothie bar' },
  { name: 'Coffee bar  &amp; pastry shop' },
  { name: 'Traditional continental breakfast' },
  { name: '24-hour concierge service' },
  { name: 'Business center' },
  { name: 'Complimentary wireless service' },
  { name: 'Laundry &amp; dry cleaning service' },
  { name: 'Daily paper' },
  { name: 'Certified "green" hotel' },
  { name: 'Pet-friendly rooms  &amp; common areas' },
];

const params = {
  RequestItems: {
    Services: items.map((item) => ({
      PutRequest: {
        Item: {
          name: { S: item.name },
          // Add more attributes as needed
        },
      },
    })),
  },
};

// Batch write items into the DynamoDB table
dynamodb.batchWriteItem(params, (err, data) => {
  if (err) {
    console.error(
      'Unable to batch write items. Error JSON:',
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log('Batch write successful:', JSON.stringify(data, null, 2));
  }
});
