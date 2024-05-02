import { Post, User } from "./models"
import { dbConnect } from "./utils"

//Handle main data requests from database.

export const getPosts = async () => {
    try{
        await dbConnect();
        const posts = await Post.find()
        return posts;
    } catch(err){
        throw new Error("Failed to fetch posts!")
    }
}

export const getPost = async (slug) => {
    try{
        await dbConnect();
        const post = await Post.findOne({slug});
        return post;
    } catch(err){
        throw new Error("Failed to fetch posts!")
    }
}

export const getUser = async (id) => {
    try{
        await dbConnect();
        const user = await User.findById(id);
        return user;
    } catch(err){
        throw new Error("Failed to fetch posts!")
    }
}

export const getVault =async(id) => {
    try {
        await dbConnect();
        const user = await User.findById(id);
        return user.vault;
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch vault!")
    }
}