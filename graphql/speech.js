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

export let speechCountType = new GraphQLObjectType({
  name: "SpeechCount",
  fields: () => ({
    bioguide_id: { type: GraphQLString, resolve: rep => rep.bioguide_id },
    frequency: { type: GraphQLInt, resolve: rep => rep.frequency },
    rank: { type: GraphQLInt, resolve: rep => rep.rank },
    word: { type: GraphQLString, resolve: rep => rep.word },
  })
});

export let getSpeechSchema = () => {
  return {
    type: new GraphQLList(speechCountType),
    args: {
      bioguide_id: { type: GraphQLString },
    },
    resolve: (__, args) => {
      let { bioguide_id } = args;
      if (!!bioguide_id) {
        return new Promise((resolve, reject) => {
          rp({
            method: 'POST',
            uri: `${config.backend.uri}/search_top_words`,
            body: { bioguide_id },
            json: true
          })
          .catch(error => reject(error))
          .then(reps => resolve(reps.results));
        });
      }
      else {
        return null;
      }
    }
  }
}
