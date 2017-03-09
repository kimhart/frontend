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
import { getUserSchema, Login } from './user';
import { getRepListSchema, getRepListByZipcodeSchema, getRepSchema, getRepMembershipSchema, getRepMembershipStatsSchema, getRepAttendanceSchema, getRepParticipationSchema, getRepEfficacySchema, getRepPolicyAreasSchema } from './rep';

let schema = (db) => {
  class Data {};
  let data = new Data();

  let nodeDefs = nodeDefinitions(
    (globalId) => {
      let {type} = fromGlobalId(globalId);
      if (type === 'Data') {
        return data;
      }
      return null;
    },
    (obj) => {
      if (obj instanceof Data) {
        return dataSchema;
      }
      return null;
    }
  );

  let dataSchema = new GraphQLObjectType({
    name: "Data",
    fields: () => ({
      id: globalIdField("Data"),
      user: getUserSchema(),
      reps: getRepSchema(),
      reps_list: getRepListSchema(),
      reps_zip: getRepListByZipcodeSchema(),
      memberships: getRepMembershipSchema(),
      membership_stats: getRepMembershipStatsSchema(),
      attendance: getRepAttendanceSchema(),
      participation: getRepParticipationSchema(),
      policy_areas: getRepPolicyAreasSchema(),
      efficacy: getRepEfficacySchema(),
    }),
    interfaces: [nodeDefs.nodeInterface]
  });

  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "Query",
      fields: () => ({
        node: nodeDefs.nodeField,
        data: {
          type: dataSchema,
          resolve: () => data
        },
      })
    }),
    mutation: new GraphQLObjectType({
      name: "Mutation",
      fields: () => ({
        Login
      })
    })
  });
}

export default schema;
