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

export let repType = new GraphQLObjectType({
  name: "Rep",
  fields: () => ({
  address: { type: GraphQLString, resolve: rep => rep.address },
  bio_text: { type: GraphQLString, resolve: rep => rep.bio_text },
  bioguide_id: { type: GraphQLString, resolve: rep => rep.bioguide_id },
  chamber: { type: GraphQLString, resolve: rep => rep.chamber },
  congress_url: { type: GraphQLString, resolve: rep => rep.congress_url },
  district: { type: GraphQLInt, resolve: rep => rep.district },
  facebook: { type: GraphQLString, resolve: rep => rep.facebook },
  leadership_position: { type: GraphQLString, resolve: rep => rep.leadership_position },
  name: { type: GraphQLString, resolve: rep => rep.name },
  party: { type: GraphQLString, resolve: rep => rep.party },
  phone: { type: GraphQLString, resolve: rep => rep.phone },
  photo_url: { type: GraphQLString, resolve: rep => rep.photo_url },
  // reps_membership: [ { '0': [Object], '1': [Object] } ],
  served_until: { type: GraphQLString, resolve: rep => rep.served_until },
  state: { type: GraphQLString, resolve: rep => rep.state },
  twitter_handle: { type: GraphQLString, resolve: rep => rep.twitter_handle },
  twitter_url: { type: GraphQLString, resolve: rep => rep.twitter_url },
  website: { type: GraphQLString, resolve: rep => rep.website },
  year_elected: { type: GraphQLInt, resolve: rep => rep.year_elected },
  })
});
