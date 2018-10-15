const { GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema
 } = require('graphql');

const BASE_URL = 'http://localhost:4000/';

var allAuthors = {
    // INIT YOUR DATA HERE
};

var allPosts = {
    // INIT YOUR DATA HERE
};

// Construct a schema, using GraphQL schema language
const Author = new GraphQLObjectType({
    name: "Author",
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString }
    }
});

const Post = new GraphQLObjectType({
    name: "Post",
    fields: {
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        author: {
            type: Author,
            resolve: (rawPostData) => {
                let authorId = rawPostData.authorId;
                return request(BASE_URL + 'authors/${authorId}').then(JSON.parse); // REST Hateos to author entity
            }
        }
    }
});

const QueryType = new GraphQLObjectType({
    name: "Blog",
    fields: {
        title: { type: GraphQLString },
        authors: {
            type: GraphQLList(Author),
            args: {
                id: { type: GraphQLInt }
            },
            resolve: function (_, { id }) {
                return allAuthors[id];
            } 
        },
        posts: {
            type: GraphQLList(Post),
            args: {
                id: { type: GraphQLInt }
            },
            resolve: function (_, { id }) {
                return allPosts[id];
            }
        }
    }
    
});

module.exports = new GraphQLSchema({
    query: QueryType
});