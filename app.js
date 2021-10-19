const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')

const { typeDefs } = require ('./typeDefs')
const { resolvers } = require ('./resolvers')

async function startServer() {
    const app = express()
    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({ app: app })
    
    await mongoose.connect("mongodb://localhost:27017/gql-blog", {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    console.log("MongoDB Connected")

    app.listen(4000, () => {
        console.log(`🚀 Listening to port 4000`)
    })

}
startServer()