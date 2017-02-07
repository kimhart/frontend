import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import {
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray,
  mutationWithClientMutationId,
  globalIdField,
  fromGlobalId,
  nodeDefinitions
} from 'graphql-relay';

import rp from 'request-promise';
import config from './config';

let userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    email: { type: GraphQLString, resolve: user => user.email },
    password: { type: GraphQLString, resolve: user => user.password },
    first_name: { type: GraphQLString, resolve: user => user.first_name },
    last_name: { type: GraphQLString, resolve: user => user.last_name },
    street: { type: GraphQLString, resolve: user => user.street },
    zip_code: { type: GraphQLString, resolve: user => user.zipcode },
    gender: { type: GraphQLString, resolve: user => user.gender },
    dob: { type: GraphQLString, resolve: user => user.dob }
  })
});

export let getUserSchema = () => {
  return {
    type: new GraphQLList(userType),
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString }
    },
    resolve: (__, args) => {
      let { email, password } = args;
      if (!!email && !!password) {
        return new Promise((resolve, reject) => {
          rp({
            method: 'POST',
            uri: `${config.backend.uri}/login`,
            body: { email, password },
            json: true
          })
          .catch(error => {
            reject(error)
          })
          .then(data => {
            let { results } = data;
            console.log({ file: 'user.js', results });
            resolve(results);
          })
        });
      }
      else {
        return null;
      }
    }
  }
}
