import fs from 'fs';
import express from 'express';
import path from 'path';
import Schema from './graphql/schema'
import bodyParser from 'body-parser';
import GraphQLHTTP from 'express-graphql'
import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';
import SchemaExporter from './utilities/SchemaExporter';

const app = express();
const schema = Schema(/* optional required connection */);
const port = 3000;

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

app.listen(port, () => console.log(new Date(), 'Listening on port', port));

SchemaExporter(schema);
