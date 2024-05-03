"use server";
import { signIn, signOut } from "./auth";
import { checkHash, genHash } from "./crypto";
import { Post, User } from "./models";
import { dbConnect } from "./utils";
import {revalidatePath} from "next/cache";

//Various user actions all in one place

export const register = async (previousState, formData) => {
    const {username,email,password, img} = formData;
    var uploadImg;

    if (img !== null) {
        uploadImg = img
    } else {
        uploadImg = "/no-avatar.png"
    }

    try {
        await dbConnect();
        const user = await User.findOne({username});
        const userEmail = await User.findOne({email});
        if(user){
            return {error: "Lietotājvārds eksistē!"}
            
        }
        if (userEmail) {
            return {error: "Lietotājs ar šādu e-pastu ir reģistrēts!"}
        }
        const hashedPass = await genHash(password)
        const newUser = new User({
            username,
            email,
            password: hashedPass,
            img : uploadImg,
        });
        await newUser.save();
        return {success: true}
    }catch(err) {
        console.log(err)
        return {error: "Reģistrācijas kļūda!"};
    }
}

export const addPost = async (previousState,formData) => {
    var uploadImg = "/no-image.png"
    if (formData.img !== null) {
        uploadImg = formData.img
    } else {
    
    }
    try {
        await dbConnect();
        const newPost = new Post({
            title: formData.title,
            descr: formData.descr,
            slug: formData.slug,
            userId: formData.userId,
            img: uploadImg,
        });
        await newPost.save();
        revalidatePath("/admin")
        revalidatePath("/blog")
        return {success: true};
    }catch(err) {
        console.log(err)
        return {error: "Kļūda!"};
    }
}

export const deletePost = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      await dbConnect();
      await Post.findByIdAndDelete(id);
      console.log(`Post with id=${id} deleted from db`);
      revalidatePath("/blog");
      revalidatePath("/admin");
    } catch (err) {
      console.log(err);
      return { error: "Kļūda!" };
    }
};

export const createVault = async (userId,master) => {
    const id = userId.userId
    const vault = ""
    const masterHash = await genHash(master)
    try {
      await dbConnect();
      await User.updateOne({_id : id}, {$set : {master : masterHash, vault : vault}});
      revalidatePath("/vault");
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };

export const checkMaster = async (userId, master) => {
    try {
        await dbConnect();
        const user = await User.findById(userId);
        var validated = await checkHash(user.master, master);
        if (!validated) {
            return false
        }
        return true
    } catch (error) {
        console.log(error)
        return {error: "Validation failed"}
    }
}

export const login = async (previousState,formData) => {
    const {username,password} = Object.fromEntries(formData);

    try {
        await signIn("credentials",{username,password});
    }catch(err) {
        console.log(err)

        if(err.message.includes("CredentialsSignin")) {
            return {error: "Nepareizs lietotājvārds vai parole!"}
        }

        throw err;
    }
}

export const handleLogout = async () => {
    await signOut();
}