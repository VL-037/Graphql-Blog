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
        getBlogs: async () => {
            return await Blog.find().populate('author')
        },
        getBlogById: async (parents, args, context, info) => {
            const BlogId = args.id
            return await Blog.findById(BlogId).populate('author')
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
        updateUser: async (parents, args, context, info) => {
            const userId = args.id
            const { description } = args.user
            const updates = {
                lastUpdate: new Date()
            }

            // just in case update can overwrite content
            if (description !== undefined)
                updates.description = description

            const user = await User.findOneAndUpdate(
                { _id: userId },
                updates,
                { new: true } // return updated object
            )
            const newLog = `Profile updated at ${updates.lastUpdate}.`
            user.updateLog.push(newLog)
            await user.save()
            return user
        },
        deleteUser: async (parents, args, context, info) => {
            const user = await User.findById(args.id)
            await Blog.deleteMany({ author: { _id: user.id} }) // delete all author's blogs
            await User.findByIdAndDelete(user.id)
            return `User '${user.id} (${user.name})' and its blogs are successfully deleted`
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
        },
        updateBlog: async (parents, args, context, info) => {
            const blogId = args.id
            const { title, body } = args.blog
            const updates = {
                lastUpdate: new Date()
            }

            // just in case update can overwrite content
            if (title !== undefined)
                updates.title = title
            if (body !== undefined)
                updates.body = body

            const blog = await Blog.findOneAndUpdate(
                { _id: blogId },
                updates,
                { new: true } // return updated object
            )
            const newLog = `Blog updated at ${updates.lastUpdate}.`
            blog.updateLog.push(newLog)
            await blog.save()
            return blog
        },
        deleteBlog: async (parents, args, context, info) => {
            const blog = await Blog.findById(args.id)
            await Blog.findByIdAndDelete(blog.id)
            return `Blog '${blog.id} (${blog.title})' is successfully deleted`
        }
    }
}