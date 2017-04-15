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
    error: { type: GraphQLString, resolve: user => user.error || user.results },
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
        if (!!user && !!user.user_id) {
          resolve(user);
        }
        else {
          resolve({ user: { error: 'Double check your username and password.' } });
        }
      });
    });
  },
});

export let Signup = mutationWithClientMutationId({
  name: 'Signup',
  inputFields: {
    clientMutationId: { type: GraphQLString, resolve: ({ clientMutationId }) => clientMutationId },
    email: { type: GraphQLString, resolve: ({ email }) => email },
    password: { type: GraphQLString, resolve: ({ password }) => password  },
    first_name: { type: GraphQLString, resolve: ({ first_name }) => first_name  },
    last_name: { type: GraphQLString, resolve: ({ last_name }) => last_name  },
    street: { type: GraphQLString, resolve: ({ street }) => street  },
    zip_code: { type: GraphQLString, resolve: ({ zip_code }) => zip_code  },
  },
  outputFields: {
    user: {
      type: userType,
      resolve: user => user,
    }
  },
  mutateAndGetPayload: ({ email, password, first_name, last_name, street, zip_code }) => {
    return new Promise(function(resolve, reject) {
      rp({
        method: 'POST',
        uri: `${config.backend.uri}/new_user`,
        body: { email, password, first_name, last_name, street, zip_code },
        json: true
      })
      .catch(error => {
        reject(error)
      })
      .then(user => {
        let { results, user_id } = user;
        if (!!user_id) {
          resolve({ user_id });
        } else {
          let errors = {
            'Bad address': `We couldn't the address you entered. Please try again.`,
            'oops! That user name already exists.': 'That email already exists.'
          }
          resolve({ error: errors[results] || `There was an error in what you've entered. Please verify your information is correct.` });
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
      password: { type: GraphQLString },
      user_id: { type: GraphQLString },
    },
    resolve: (__, args) => {
      let { email, password, user_id } = args;
      if (!!user_id && user_id !== 'null') {
        return new Promise((resolve, reject) => {
          rp({
            method: 'POST',
            uri: `${config.backend.uri}/login`,
            body: { user_id },
            json: true
          })
          .catch(error => reject(error))
          .then(user => resolve(user));
        });
      }
      else if (!!email && email !== 'null' && !!password && password !== 'null') {
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
