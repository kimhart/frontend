import fs from 'fs';
import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';

export default (schema) => {
  var generateSchemaJson = async () => await graphql(schema, introspectionQuery);

  // generate schema.json function
  generateSchemaJson().then(json => {
    fs.writeFile('./graphql/schema.json', JSON.stringify(json, null, 2), err => {
      if (err) { throw err; }
      console.log("Schema generated successfully");
    })
  }).catch(error => {
    console.error("ERROR: Generating Schema JSON File: ", error);
  })
}
