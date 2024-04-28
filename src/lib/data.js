import { Post, User } from "./models"
import { dbConnect } from "./utils"

export const getPosts = async () => {
    try{
        dbConnect();
        const posts = await Post.find()
        return posts;
    } catch(err){
        throw new Error("Failed to fetch posts!")
    }
}

export const getPost = async (slug) => {
    try{
        dbConnect();
        const post = await Post.findOne({slug});
        return post;
    } catch(err){
        throw new Error("Failed to fetch posts!")
    }
}

export const getUsers = async () => {
    try{
        dbConnect();
        const users = await User.find()
        return users;
    } catch(err){
        throw new Error("Failed to fetch posts!")
    }
}

export const getUser = async (id) => {
    try{
        dbConnect();
        const user = await User.findById(id);
        return user;
    } catch(err){
        throw new Error("Failed to fetch posts!")
    }
}

export const getVault =async(id) => {
    try {
        dbConnect();
        const user = await User.findById(id);
        return user.vault;
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch vault!")
    }
}