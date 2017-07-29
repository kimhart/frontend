'use strict';
import React from 'react';
import Relay from 'react-relay';

class ChangeAddressMutation extends Relay.Mutation {

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
    let { user_id, street, zip_code, user } = this.props;
    return { user_id, street, zip_code };
  }

  // This method should return a GraphQL operation that represents the mutation to be performed.
  getMutation() {
    return Relay.QL`mutation { ChangeAddress }`;
  }

  // this tells Relay what to do with the data when it's returned
  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [
        Relay.QL`
          fragment on ChangeAddressPayload {
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
      fragment on ChangeAddressPayload @relay(pattern: true) {
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

export default ChangeAddressMutation;
