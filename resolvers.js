const User = require('./models/User')
const Blog = require('./models/Blog')

module.exports.resolvers = {
    Query: {
        getUsers: async () => {
            return await User.find()
        },
        getUserById: async (parents, args, context, info) => {
            const userId = args.id
            return await User.findById(userId)
        },

        getBlogs: async(parents, args, context, info) => {
            return await Blog.find().populate('author')
        }
    },

    Mutation: {
        createUser: async (parents, args, context, info) => {
            const { name, age, email, description } = args.user
            const newUser = new User({
                name,
                age,
                email,
                description,
                lastUpdate: new Date()
            })
            newUser.updateLog.push(`User created at ${newUser.lastUpdate}.`)
            await newUser.save()
            return newUser
        },

        createBlog: async (parents, args, context, info) => {
            const { title, body, userId } = args.blog
            const user = await User.findById(userId)
            const newBlog = new Blog({
                title,
                body,
                author: user,
                lastUpdate: new Date()
            })
            newBlog.updateLog.push(`Blog created at ${newBlog.lastUpdate}.`)
            await newBlog.save()
            return newBlog
        }
    }
}