import Post from "../models/postModel"
import { errorHandler } from "../utils/error"

export const create = async (req, res, next) => {
    if (!req.body.isAdmin) {
        return next(errorHandler(404, 'Only Admin  are  allowed to post a course'))
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(404, 'Please require all the fields'))
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-')
    const newPost = new Post ({
        ...req.body, slug, userId:req.user.id
    })
    try {
        const savedPost = await newPost.save()
        res.status(201).json(savedPost)
    } catch (error) {
        next(error)
    }
}