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
import _ from 'lodash';
import config from './config';
import { repType } from './rep';

let userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    city: { type: GraphQLString, resolve: user => user.city },
    district: { type: GraphQLInt, resolve: user => user.district },
    first_name: { type: GraphQLString, resolve: user => user.first_name },
    last_name: { type: GraphQLString, resolve: user => user.last_name },
    state_long: { type: GraphQLString, resolve: user => user.state_long },
    state_short: { type: GraphQLString, resolve: user => user.state_short },
    user_id: { type: GraphQLString, resolve: user => user.user_id },
    // reps: { type: new GraphQLList(repType), resolve: user => user.reps_data },
    error: { type: GraphQLString, resolve: user => user.error },
    // email: { type: GraphQLString, resolve: user => user.email },
    // password: { type: GraphQLString, resolve: user => user.password },
    // street: { type: GraphQLString, resolve: user => user.street },
    // zip_code: { type: GraphQLString, resolve: user => user.zipcode },
    // gender: { type: GraphQLString, resolve: user => user.gender },
    // dob: { type: GraphQLString, resolve: user => user.dob }
  })
});

export let Login = mutationWithClientMutationId({
  name: 'Login',
  inputFields: {
    clientMutationId: { type: GraphQLString, resolve: ({ clientMutationId }) => clientMutationId },
    email: { type: GraphQLString, resolve: ({ email }) => email },
    password: { type: GraphQLString, resolve: ({ password }) => password  }
  },
  outputFields: {
    user: {
      type: userType,
      resolve: user => user,
    }
  },
  mutateAndGetPayload: ({ email, password }) => {
    return new Promise(function(resolve, reject) {
      rp({
        method: 'POST',
        uri: `${config.backend.uri}/login`,
        body: { email, password },
        json: true
      })
      .catch(error => {
        reject(error)
      })
      .then(user => {
        if (!!user.user_id) {
          resolve(user);
        }
        else {
          resolve({ error: 'Please check your username and password.' });
        }
      });
    });
  },
});

export let getUserSchema = () => {
  return {
    type: userType,
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
          .catch(error => reject(error))
          .then(user => resolve(user));
        });
      }
      else {
        return null;
      }
    }
  }
}
