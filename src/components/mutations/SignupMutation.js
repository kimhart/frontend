'use strict';
import React from 'react';
import Relay from 'react-relay';

class SignupMutation extends Relay.Mutation {

  // fragments required for this mutation
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        city
        district
        first_name
        last_name
        state_long
        state_short
        user_id
        error
      }
    `,
  };

  // translates props into useable variables
  getVariables() {
    let { email, password, user, first_name, last_name, street, zip_code } = this.props;
    return { email, password, first_name, last_name, street, zip_code };
  }

  // This method should return a GraphQL operation that represents the mutation to be performed.
  getMutation() {
    return Relay.QL`mutation { Signup }`;
  }

  // this tells Relay what to do with the data when it's returned
  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [
        Relay.QL`
          fragment on SignupPayload {
            user {
              city
              district
              first_name
              last_name
              state_long
              state_short
              user_id
              error
            }
          }
        `,
      ],
    }, {
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        user: this.props.user,
      },
    }];
  }

  getFatQuery() {
    return  Relay.QL`
      fragment on SignupPayload @relay(pattern: true) {
        user {
          city
          district
          first_name
          last_name
          state_long
          state_short
          user_id
          error
        }
      }
    `
  }
}

export default SignupMutation;
