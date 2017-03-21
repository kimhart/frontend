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


let rankAttendanceType = new GraphQLObjectType({
  name: "RankAttendance",
  fields: () => ({
    bioguide_id: { type: GraphQLString, resolve: rep => rep.bioguide_id },
    district: { type: GraphQLInt, resolve: rep => rep.district },
    days_at_work: { type: GraphQLInt, resolve: rep => rep.days_at_work},
    name: { type: GraphQLString, resolve: rep => rep.name},
    party: { type: GraphQLString, resolve: rep => rep.party},
    percent_at_work: { type: GraphQLFloat, resolve: rep => rep.percent_at_work},
    photo_url: { type: GraphQLString, resolve: rep => rep.photo_url},
    rank: { type: GraphQLInt, resolve: rep => rep.rank},
    state: { type: GraphQLString, resolve: rep => rep.state},
    total_work_days: { type: GraphQLInt, resolve: rep => rep.total_work_days}
  })
})

let rankParticipationType = new GraphQLObjectType({
  name: "RankParticipation",
  fields: () => ({
    bioguide_id: { type: GraphQLString, resolve: rep => rep.bioguide_id },
    district: { type: GraphQLInt, resolve: rep => rep.district },
    name: { type: GraphQLString, resolve: rep => rep.name },
    party: { type: GraphQLString, resolve: rep => rep.party },
    percent_votes: { type: GraphQLFloat, resolve: rep => rep.percent_votes },
    photo_url: { type: GraphQLString, resolve: rep => rep.photo_url },
    rank: { type: GraphQLInt, resolve: rep => rep.rank },
    rep_votes: { type: GraphQLInt, resolve: rep => rep.rep_votes },
    state: { type: GraphQLString, resolve: rep => rep.state },
    total_votes: { type: GraphQLInt, resolve: rep => rep.total_votes }
  })
})

let rankEfficacyType = new GraphQLObjectType({
  name: "RankEfficacy",
  fields: () => ({
    bioguide_id: { type: GraphQLString, resolve: rep => rep.bioguide_id },
    rep_sponsor: { type: GraphQLInt, resolve: rep => rep.rep_sponsor },
    district: { type: GraphQLInt, resolve: rep => rep.district },
    name: { type: GraphQLString, resolve: rep => rep.name },
    party: { type: GraphQLString, resolve: rep => rep.party },
    sponsor_percent: { type: GraphQLFloat, resolve: rep => rep.sponsor_percent },
    photo_url: { type: GraphQLString, resolve: rep => rep.photo_url },
    rank: { type: GraphQLInt, resolve: rep => rep.rank },
    state: { type: GraphQLString, resolve: rep => rep.state },
    max_sponsor: { type: GraphQLInt, resolve: rep => rep.max_sponsor }
  })
})


export let rankAttendanceSchema = () => {
  return {
    type: new GraphQLList(rankAttendanceType),
    args: {
      chamber: { type: GraphQLString }
    },
    resolve: (__, args) => {
      let { chamber } = args;
      if (!!chamber) {
        return new Promise((resolve, reject) => {
          rp({
            method: 'POST',
            uri: `${config.backend.uri}/rank_attendance`,
            body: { chamber },
            json: true
          })
          .catch(error => reject(error))
          .then(rank_attendance => resolve(rank_attendance.results));
        });
      }
      else {
        return null;
      }
    }
  }
}

export let rankParticipationSchema = () => {
  return {
    type: new GraphQLList(rankParticipationType),
    args: {
      chamber: { type: GraphQLString }
    },
    resolve: (__, args) => {
      let { chamber } = args;
      if (!!chamber) {
        return new Promise((resolve, reject) => {
          rp({
            method: 'POST',
            uri: `${config.backend.uri}/rank_participation`,
            body: { chamber },
            json: true
          })
          .catch(error => reject(error))
          .then(rank_participation => resolve(rank_participation.results));
        });
      }
      else {
        return null;
      }
    }
  }
}

export let rankEfficacySchema = () => {
  return {
    type: new GraphQLList(rankEfficacyType),
    args: {
      chamber: { type: GraphQLString }
    },
    resolve: (__, args) => {
      let { chamber } = args;
      if (!!chamber) {
        return new Promise((resolve, reject) => {
          rp({
            method: 'POST',
            uri: `${config.backend.uri}/rank_efficacy`,
            body: { chamber },
            json: true
          })
          .catch(error => reject(error))
          .then(rank_efficacy => resolve(rank_efficacy.results));
        });
      }
      else {
        return null;
      }
    }
  }
}
