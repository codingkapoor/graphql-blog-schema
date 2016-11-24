// import * as _ from 'underscore';

// This is the Dataset in our blog
import PostsList from './data/posts';
// import AuthorsList from './data/authors';
// import {CommentList, ReplyList} from './data/comments';

import {
    // These are the basic GraphQL types
    // GraphQLInt,
    // GraphQLFloat,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    // GraphQLEnumType,

    // This is used to create required fields and arguments
    GraphQLNonNull,

    // This is the class we need to create the schema
    GraphQLSchema
} from 'graphql';

/**
  DEFINE YOUR TYPES BELOW
**/
const Post = new GraphQLObjectType({
    name: 'Post',
    description: 'This represents a Post',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        title: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: function (post) {
                return post.title || "Doesn't exist";
            }
        },
        content: {type: GraphQLString}
    })
});

// This is the Root Query
const Query = new GraphQLObjectType({
    name: 'BlogSchema',
    description: 'Root of the Blog Schema',
    fields: () => ({
        posts: {
            type: new GraphQLList(Post),
            description: 'List of all the posts',
            resolve: function() {
                return PostsList;
            }
        },
        echo: {
            type: GraphQLString,
            description: 'Echo what you enter',
            args: {
                message: {
                    type: GraphQLString
                }
            },
            resolve: function (source, {message}) {
                return `received ${message}`;
            }
        }
    })
});

// The Schema
const Schema = new GraphQLSchema({
    query: Query
});

export default Schema;