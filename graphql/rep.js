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

export let repType = new GraphQLObjectType({
  name: "Rep",
  fields: () => ({
    address: { type: GraphQLString, resolve: rep => rep.address },
    attendance: { type: new GraphQLList(repAttendanceType), resolve: rep => rep.attendance },
    bio_text: { type: GraphQLString, resolve: rep => rep.bio_text },
    bioguide_id: { type: GraphQLString, resolve: rep => rep.bioguide_id },
    chamber: { type: GraphQLString, resolve: rep => rep.chamber },
    congress_url: { type: GraphQLString, resolve: rep => rep.congress_url },
    district: { type: GraphQLInt, resolve: rep => rep.district },
    efficacy: { type: new GraphQLList(repEfficacyType), resolve: rep => rep.efficacy },
    facebook: { type: GraphQLString, resolve: rep => rep.facebook },
    leadership_position: { type: GraphQLString, resolve: rep => rep.leadership_position },
    name: { type: GraphQLString, resolve: rep => rep.name },
    participation: { type: new GraphQLList(repParticipationType), resolve: rep => rep.participation },
    party: { type: GraphQLString, resolve: rep => rep.party },
    phone: { type: GraphQLString, resolve: rep => rep.phone },
    photo_url: { type: GraphQLString, resolve: rep => rep.photo_url },
    policy_areas: { type: new GraphQLList(repPolicyAreasType), resolve: rep => rep.policy_areas },
    memberships: { type: new GraphQLList(repMembershipType), resolve: rep => rep.memberships },
    membership_stats: { type: new GraphQLList(repMembershipStatsType), resolve: rep => rep.membership_stats },
    served_until: { type: GraphQLString, resolve: rep => rep.served_until },
    state: { type: GraphQLString, resolve: rep => rep.state },
    twitter_handle: { type: GraphQLString, resolve: rep => rep.twitter_handle },
    twitter_url: { type: GraphQLString, resolve: rep => rep.twitter_url },
    website: { type: GraphQLString, resolve: rep => rep.website },
    year_elected: { type: GraphQLInt, resolve: rep => rep.year_elected },
  })
});

let repMembershipType = new GraphQLObjectType({
  name: "RepMembership",
  fields: () => ({
    bioguide_id: { type: GraphQLString, resolve: rep => rep.bioguide_id },
    committee: { type: GraphQLString, resolve: rep => rep.committee },
    committee_leadership: { type: GraphQLString, resolve: rep => rep.committee_leadership },
    subcommittee: { type: GraphQLString, resolve: rep => rep.subcommittee },
  })
});

let repMembershipStatsType = new GraphQLObjectType({
  name: "RepMembershipStats",
  fields: () => ({
    bioguide_id: { type: GraphQLString, resolve: rep => rep.bioguide_id },
    num_committees: { type: GraphQLInt, resolve: rep => rep.num_committees },
    max_committees: { type: GraphQLInt, resolve: rep => rep.max_committees},
    percent: { type: GraphQLFloat, resolve: rep => rep.percent}
  })
})

let repAttendanceType = new GraphQLObjectType({
  name: "RepAttendance",
  fields: () => ({
    days_at_work: { type: GraphQLInt, resolve: rep => rep.days_at_work },
    percent_at_work: { type: GraphQLFloat, resolve: rep => rep.percent_at_work },
    total_work_days: { type: GraphQLInt, resolve: rep => rep.total_work_days},
  })
})

let repParticipationType = new GraphQLObjectType({
  name: "RepParticipation",
  fields: () => ({
    bioguide_id: { type: GraphQLString, resolve: rep => rep.bioguide_id },
    percent_votes: { type: GraphQLFloat, resolve: rep => rep.percent_votes },
    rep_votes: { type: GraphQLInt, resolve: rep => rep.rep_votes},
    total_votes: { type: GraphQLInt, resolve: rep => rep.total_votes}
  })
})

let repEfficacyType = new GraphQLObjectType({
  name: "RepEfficacy",
  fields: () => ({
    bioguide_id: { type: GraphQLString, resolve: rep => rep.bioguide_id },
    max_sponsor: { type: GraphQLInt, resolve: rep => rep.max_sponsor },
    rep_sponsor: { type: GraphQLInt, resolve: rep => rep.rep_sponsor},
    sponsor_percent: { type: GraphQLFloat, resolve: rep => rep.sponsor_percent}
  })
})

let repPolicyAreasType = new GraphQLObjectType({
  name: "RepPolicyAreas",
  fields: () => ({
    policy_area: { type: GraphQLString, resolve: rep => rep.policy_area },
    percent: { type: GraphQLFloat, resolve: rep => rep.percent }
  })
})

export let getRepMembershipSchema = () => {
  return {
    type: new GraphQLList(repMembershipType),
    args: {
      bioguide_id: { type: GraphQLString },
      chamber: { type: GraphQLString },
    },
    resolve: (__, args) => {
      let { bioguide_id, chamber } = args;
      if (!!bioguide_id && !!chamber) {
        return new Promise((resolve, reject) => {
          rp({
            method: 'POST',
            uri: `${config.backend.uri}/committee_membership`,
            body: { bioguide_id, chamber },
            json: true
          })
          .catch(error => reject(error))
          .then(memberships => resolve(memberships.results));
        });
      }
      else {
        return null;
      }
    }
  }
}

export let getRepAttendanceSchema = () => {
  return {
    type: repAttendanceType,
    args: {
      bioguide_id: { type: GraphQLString },
      congress: { type: GraphQLString },
      chamber: { type: GraphQLString }
    },
    resolve: (__, args) => {
      let { bioguide_id, congress, chamber } = args;
      if (!!bioguide_id && !!congress && !!chamber) {
        return new Promise((resolve, reject) => {
          rp({
            method: 'POST',
            uri: `${config.backend.uri}/attendance`,
            body: { bioguide_id, chamber },
            json: true
          })
          .catch(error => reject(error))
          .then(attendance => resolve(attendance));
        });
      }
      else {
        return null;
      }
    }
  }
}

export let getRepParticipationSchema = () => {
  return {
    type: repParticipationType,
    args: {
      bioguide_id: { type: GraphQLString },
      congress: { type: GraphQLString },
      chamber: { type: GraphQLString }
    },
    resolve: (__, args) => {
      let { bioguide_id, congress, chamber } = args;
      if (!!bioguide_id && !!congress && !!chamber) {
        return new Promise((resolve, reject) => {
          rp({
            method: 'POST',
            uri: `${config.backend.uri}/participation`,
            body: { bioguide_id, congress, chamber },
            json: true
          })
          .catch(error => reject(error))
          .then(participation => resolve(participation));
        });
      }
      else {
        return null;
      }
    }
  }
}

export let getRepEfficacySchema = () => {
  return {
    type: repEfficacyType,
    args: {
      bioguide_id: { type: GraphQLString },
      congress: { type: GraphQLString }
    },
    resolve: (__, args) => {
      let { bioguide_id, congress } = args;
      if (!!bioguide_id && !!congress) {
        return new Promise((resolve, reject) => {
          rp({
            method: 'POST',
            uri: `${config.backend.uri}/efficacy`,
            body: { bioguide_id, congress },
            json: true
          })
          .catch(error => reject(error))
          .then(efficacy => resolve(efficacy));
        });
      }
      else {
        return null;
      }
    }
  }
}

export let getRepMembershipStatsSchema = () => {
  return {
    type: repMembershipStatsType,
    args: {
      bioguide_id: { type: GraphQLString },
      chamber: { type: GraphQLString }
    },
    resolve: (__, args) => {
      let { bioguide_id, chamber } = args;
      if (!!bioguide_id && !!chamber) {
        return new Promise((resolve, reject) => {
          rp({
            method: 'POST',
            uri: `${config.backend.uri}/membership_stats`,
            body: { bioguide_id, chamber },
            json: true
          })
          .catch(error => reject(error))
          .then(membership_stats => resolve(membership_stats));
        });
      }
      else {
        return null;
      }
    }
  }
}

export let getRepPolicyAreasSchema = () => {
  return {
    type: new GraphQLList(repPolicyAreasType),
    args: {
      bioguide_id: { type: GraphQLString }
    },
    resolve: (__, args) => {
      let { bioguide_id } = args;
      if (!!bioguide_id) {
        return new Promise((resolve, reject) => {
          rp({
            method: 'POST',
            uri: `${config.backend.uri}/policy_areas`,
            body: { bioguide_id },
            json: true
          })
          .catch(error => reject(error))
          .then(policy_areas => resolve(policy_areas.results));
        });
      }
      else {
        return null;
      }
    }
  }
}

export let getRepListByZipcodeSchema = () => {
  return {
    type: new GraphQLList(repType),
    args: {
      zip_code: { type: GraphQLString }
    },
    resolve: (__, args) => {
      let { zip_code } = args;
      if (!!zip_code) {
        return new Promise((resolve, reject) => {
          rp({
            method: 'POST',
            uri: `${config.backend.uri}/reps_by_zip`,
            body: { zip_code },
            json: true
          })
          .catch(error => reject(error))
          .then(reps => resolve(reps.results));
        });
      } else {
        return null;
      }
    }
  }
}

export let getRepListSchema = () => {
  return {
    type: new GraphQLList(repType),
    resolve: (__, args) => {
      return new Promise((resolve, reject) => {
        rp({
          method: 'POST',
          uri: `${config.backend.uri}/list_reps`,
          json: true
        })
        .catch(error => reject(error))
        .then(reps => resolve(reps.results));
      });
    }
  }
}

export let getRepSchema = () => {
  return {
    type: new GraphQLList(repType),
    args: {
      district: { type: GraphQLInt },
      state_long: { type: GraphQLString }
    },
    resolve: (__, args) => {
      let { district, state_long } = args;
      if (!isNaN(district) && !!state_long) {
        return new Promise((resolve, reject) => {
          rp({
            method: 'POST',
            uri: `${config.backend.uri}/congress_bio`,
            body: { district, state_long },
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
