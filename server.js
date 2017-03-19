import fs from 'fs';
import express from 'express';
import path from 'path';
import moment from 'moment';
import bodyParser from 'body-parser';
import GraphQLHTTP from 'express-graphql';
import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';
import SchemaExporter from './utilities/SchemaExporter';
import Schema from './graphql/schema';
import config from './graphql/config';
let { port, logs: { dateFormat } } = config.app;

const app = express();
const schema = Schema(/* optional required connection */);

app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('public'));
app.use('/bios/:bioguide_id', express.static('public'));
app.use('/search', express.static('public'));

app.use('/graphql', GraphQLHTTP({
  schema,
  graphiql: true
}));

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port, () => console.log(moment().format(dateFormat), 'Listening on port', port));

SchemaExporter(schema);
