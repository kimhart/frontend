'use strict';
import React from 'react';
import Relay from 'react-relay';

class ChangePasswordMutation extends Relay.Mutation {

  // fragments required for this mutation
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        city
        street
        zip_code
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
    let { user_id, password, user } = this.props;
    return { user_id, password };
  }

  // This method should return a GraphQL operation that represents the mutation to be performed.
  getMutation() {
    return Relay.QL`mutation { ChangePassword }`;
  }

  // this tells Relay what to do with the data when it's returned
  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [
        Relay.QL`
          fragment on ChangePasswordPayload {
            user {
              city
              street
              zip_code
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
      fragment on ChangePasswordPayload @relay(pattern: true) {
        user {
          city
          street
          zip_code
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

export default ChangePasswordMutation;
