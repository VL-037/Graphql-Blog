const { gql } = require("apollo-server-express")
const { GraphQLScalarType } = require("graphql")

const scalarDate = new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar Type",
    serialize(value) { // converts the scalar's back-end representation to a JSON-compatible format
        return value.getTime()
    },
    parseValue(value) { // converts the scalar's JSON value to its back-end representation before it's added to a resolver's args.
        return new Date(value)
    },
    parseLiteral(ast) { // converts the AST value from a string to an integer, and then converts from integer to Date to match the result of parseValue.
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10))
        }
        return null
    },
})

module.exports.typeDefs = gql`
    scalar Date

    type User {
        id: ID!
        name: String!
        age: Int!
        email: String!
        description: String
        lastUpdate: Date!
        updateLog: [String]
    }

    input UserInput {
        name: String!
        age: Int!
        email: String!
        description: String
    }

    type Blog {
        id: ID!
        title: String!
        body: String!
        author: User!
        lastUpdate: Date!
        updateLog: [String]
    }

    input BlogInput {
        title: String!
        body: String!
        userId: ID!
    }

    type Query {
        getUsers: [User]!
        getUserById(id: ID!): User!

        getBlogs: [Blog]!
        getBlogById(id: ID!): Blog!
    }

    type Mutation {
        createUser(user: UserInput!): User!

        createBlog(blog: BlogInput!): Blog!
    }
`