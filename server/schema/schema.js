const graphql = require('graphql')
const Location = require('../models/location')
const SideStory = require('../models/sideStory')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql

const LocationType = new GraphQLObjectType({
  name: 'Location',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    scope: {type: GraphQLString},
    sideStory: {
      type: SideStoryType,
      resolve (parent, args) {
        return SideStory.find({locationId: parent.id})
      }
    }
  })
})

const SideStoryType = new GraphQLObjectType({
  name: 'SideStory',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    client: {type: GraphQLString},
    objective: {type: GraphQLString},
    location: {
      type: LocationType,
      resolve (parent, args) {
        return Location.findById(parent.locationId)
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    locations: {
      type: new GraphQLList(LocationType),
      resolve (parent, args) {
        return Location.find({})
      }
    },
    sideStorys: {
      type: new GraphQLList(SideStoryType),
      resolve (parent, args) {
        return SideStory.find({})
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addLocation: {
      type: LocationType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        scope: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve (parent, args) {
        let location = new Location({
          name: args.name,
          scope: args.scope
        })
        return location.save()
      }
    },
    addSideStory: {
      type: SideStoryType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        client: {type: new GraphQLNonNull(GraphQLString)},
        objective: {type: new GraphQLNonNull(GraphQLString)},
        locationId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve (parent, args) {
        let sideStory = new SideStory({
          name: args.name,
          client: args.client,
          objective: args.objective,
          locationId: args.locationId
        })
        return sideStory.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
