"use server";

import { signIn, signOut } from "./auth";
import { Post, User } from "./models";
import { dbConnect } from "./utils";
import bcrypt from "bcryptjs";
import {revalidatePath} from "next/cache";


export const register = async (previousState, formData) => {
    const {username,email,password, img, passwordRepeat} = Object.fromEntries(formData);

    if (password !== passwordRepeat) {
        return {error : "Paroles nesakrīt!"}
    }

    try {

        dbConnect();
        const user = await User.findOne({username});
        const userEmail = await User.findOne({email});


        if(user){
            return {error: "Lietotājvārds eksistē!"}
            
        }

        if (userEmail) {
            return {error: "Lietotājs ar šādu e-pastu ir reģistrēts!"}
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);
        
        const newUser = new User({
            username,
            email,
            password: hashedPass,
            img,
        });

        await newUser.save();
        console.log("saved")
        return {success: true};
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
        dbConnect();
        const newPost = new Post({
            title: formData.title,
            descr: formData.descr,
            slug: formData.slug,
            userId: formData.userId,
            img: uploadImg,
        });
        await newPost.save();
        console.log("saved")
        revalidatePath("/blog")
    }catch(err) {
        console.log(err)
        return {error: "Kļūda!"};
    }
}

export const deletePost = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      dbConnect();
      await Post.findByIdAndDelete(id);
      console.log(`Post with id=${id} deleted from db`);
      revalidatePath("/blog");
      revalidatePath("/admin");
    } catch (err) {
      console.log(err);
      return { error: "Kļūda!" };
    }
};

export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
      connectToDb();
      await User.findByIdAndDelete(id);
      console.log(`User with id=${id} deleted from db`);
      revalidatePath("/");
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };

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