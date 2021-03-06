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
    street: { type: GraphQLString, resolve: user => user.street },
    zip_code: { type: GraphQLString, resolve: user => user.zip_code },
    district: { type: GraphQLInt, resolve: user => user.district },
    first_name: { type: GraphQLString, resolve: user => user.first_name },
    last_name: { type: GraphQLString, resolve: user => user.last_name },
    party: { type: GraphQLString, resolve: user => user.party },
    state_long: { type: GraphQLString, resolve: user => user.state_long },
    state_short: { type: GraphQLString, resolve: user => user.state_short },
    user_id: { type: GraphQLString, resolve: user => user.user_id },
    error: { type: GraphQLString, resolve: user => user.error || user.results },
  })
});

let userInputFields = {
  clientMutationId: { type: GraphQLString, resolve: ({ clientMutationId }) => clientMutationId },
  user_id: { type: GraphQLString, resolve: ({ user_id }) => user_id },
  email: { type: GraphQLString, resolve: ({ email }) => email },
  party: { type: GraphQLString, resolve: ({ party }) => party },
  password: { type: GraphQLString, resolve: ({ password }) => password  },
  social: { type: GraphQLString, resolve: ({ social }) => social  },
  first_name: { type: GraphQLString, resolve: ({ first_name }) => first_name  },
  last_name: { type: GraphQLString, resolve: ({ last_name }) => last_name  },
  street: { type: GraphQLString, resolve: ({ street }) => street  },
  zip_code: { type: GraphQLString, resolve: ({ zip_code }) => zip_code  },
}

export let Login = mutationWithClientMutationId({
  name: 'Login',
  inputFields: { ...userInputFields },
  outputFields: {
    user: {
      type: userType,
      resolve: user => user,
    }
  },
  mutateAndGetPayload: ({ email, password, social }) => {
    return new Promise((resolve, reject) => {
      let options = {
        method: 'POST',
        uri: `${config.backend.uri}/login`,
        body: { email, password },
        json: true
      }
      if (!!social) {
        Object.assign(options.body, { social });
      }
      // console.log(JSON.stringify(options.body, null, 2));
      rp(options)
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
  inputFields: { ...userInputFields },
  outputFields: {
    user: {
      type: userType,
      resolve: user => user,
    }
  },
  mutateAndGetPayload: ({ email, password, first_name, last_name, party, street, zip_code }) => {
    return new Promise(function(resolve, reject) {
      rp({
        method: 'POST',
        uri: `${config.backend.uri}/new_user`,
        body: { email, password, first_name, last_name, party, street, zip_code },
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
            'Bad address': `We could not find the address you entered. Please try again.`,
            'That user name already exists.': 'That email already exists.'
          }
          resolve({ error: errors[results] || `There was an error in what you've entered. Please verify your information is correct.` });
        }
      });
    });
  },
});

export let ChangePassword = mutationWithClientMutationId({
  name: 'ChangePassword',
  inputFields: { ...userInputFields },
  outputFields: {
    user: {
      type: userType,
      resolve: user => user,
    }
  },
  mutateAndGetPayload: ({ user_id, password }) => {
    return new Promise((resolve, reject) => {
      rp({
        method: 'POST',
        uri: `${config.backend.uri}/change_creds`,
        body: { user_id, password, param: 'password' },
        json: true
      })
      .catch(error => {
        reject(error)
      })
      .then(user => {
        console.log({ password: user });
        let { results, user_id } = user;
        if (!!user_id) {
          resolve(user);
        } else {
          let errors = {
            'Bad address': `We could not find the address you entered. Please try again.`,
            'That user name already exists.': 'That email already exists.'
          }
          resolve({ error: errors[results] || `There was an error in what you've entered. Please verify your information is correct.` });
        }
      });
    });
  },
});

export let ChangeAddress = mutationWithClientMutationId({
  name: 'ChangeAddress',
  inputFields: { ...userInputFields },
  outputFields: {
    user: {
      type: userType,
      resolve: user => user,
    }
  },
  mutateAndGetPayload: ({ user_id, street, zip_code }) => {
    return new Promise((resolve, reject) => {
      rp({
        method: 'POST',
        uri: `${config.backend.uri}/change_creds`,
        body: { user_id, street, zip_code, param: 'address' },
        json: true
      })
      .catch(error => {
        reject(error)
      })
      .then(user => {
        console.log({ address: user });
        let { results, user_id } = user;
        if (!!user_id) {
          resolve(user);
        } else {
          let errors = {
            'Bad address': `We could not find the address you entered. Please try again.`,
            'That user name already exists.': 'That email already exists.'
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
