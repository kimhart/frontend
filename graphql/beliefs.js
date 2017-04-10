import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
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

let repBeliefType = new GraphQLObjectType({
  name: "RepBelief",
  fields: () => ({
    bioguide_id: { type: GraphQLString, resolve: rep => rep.bioguide_id },
    sub_type_of: { type: GraphQLString, resolve: rep => rep.sub_type_of },
    tally_score: { type: GraphQLFloat, resolve: rep => rep.tally_score },
    total_actions: { type: GraphQLInt, resolve: rep => rep.total_actions },
    type: { type: GraphQLString, resolve: rep => rep.type },
  })
});

export let getRepBeliefSchema = () => {
  return {
    type: new GraphQLList(repBeliefType),
    args: {
      bioguide_id: { type: GraphQLString },
    },
    resolve: (__, args) => {
      let { bioguide_id } = args;
      if (!!bioguide_id) {
        return new Promise((resolve, reject) => {
          rp({
            method: 'POST',
            uri: `${config.backend.uri}/rep_beliefs`,
            body: { bioguide_id },
            json: true
          })
          .catch(error => reject(error))
          .then(beliefs => resolve(beliefs.results));
        });
      }
      else {
        return null;
      }
    }
  }
}
