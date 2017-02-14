'use strict';
import React from 'react';
import Relay from 'react-relay';

class LoginMutation extends Relay.Mutation {

  // fragments required for this mutation
  static fragments = {
    Data: () => Relay.QL`
      fragment on Data {
        user {
          first_name
          reps {
            address
            bio_text
            bioguide_id
            chamber
            congress_url
            district
            facebook
            leadership_position
            name
            party
            phone
            photo_url
            served_until
            state
            twitter_handle
            twitter_url
            website
            year_elected
            memberships {
              bioguide_id
              committee
              committee_leadership
              subcommittee
            }
          }
        }
      }
    `,
  };

  // translates props into useable variables
  getVariables() {
    let { email, password } = this.props;
    return { email, password };
  }

  // This method should return a GraphQL operation that represents the mutation to be performed.
  getMutation() {
    return Relay.QL`mutation { Login }`;
  }

  // this tells Relay what to do with the data when it's returned
  // getConfigs() {
  //   return [
  //     {
  //       type: 'REQUIRED_CHILDREN',
  //       children: [
  //         Relay.QL`
  //           fragment on LoginPayload @relay(pattern: true) {
  //             viewState {
  //               _id
  //               state
  //             }
  //           }
  //         `
  //       ]
  //     }
  //   ];
  // }

  getFatQuery() {
    let { email, password } = this.props;
    return  Relay.QL`
      fragment on LoginPayload @relay(pattern: true) {
        user {
          first_name
          reps {
            address
            bio_text
            bioguide_id
            chamber
            congress_url
            district
            facebook
            leadership_position
            name
            party
            phone
            photo_url
            served_until
            state
            twitter_handle
            twitter_url
            website
            year_elected
            memberships {
              bioguide_id
              committee
              committee_leadership
              subcommittee
            }
          }
        }
      }
    `
  }
}

export default LoginMutation;
