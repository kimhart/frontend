const fs = require('fs');
const express = require('express');
const path = require('path');
const moment = require('moment');
const bodyParser = require('body-parser');
const GraphQLHTTP = require('express-graphql');
const {graphql} = require('graphql');
const {introspectionQuery} = require('graphql/utilities');
const SchemaExporter = require('./utilities/SchemaExporter');
const Schema = require('./graphql/schema');
const config = require('./graphql/config');
let { port, logs: { dateFormat } } = config.app;

const app = express();
const schema = Schema(/* optional required connection */);

app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('public'));

app.use('/graphql', GraphQLHTTP({
  schema,
  graphiql: true
}));

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port, () => console.log(moment().format(dateFormat), 'Listening on port', port));

SchemaExporter(schema);
