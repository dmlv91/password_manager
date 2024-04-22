"use server";

import { signIn, signOut } from "./auth";
import { User } from "./models";
import { dbConnect } from "./utils";
import bcrypt from "bcryptjs";

export const register = async (formData) => {
    const {username,email,password, img, passwordRepeat} = Object.fromEntries(formData);

    if (password !== passwordRepeat) {
        return "Paroles nesakrīt!"
    }

    try {

        dbConnect();
        const user = await User.findOne({username});
        const userEmail = await User.findOne({email});


        if(user){
            return "Lietotājvārds eksistē!"
            
        }

        if (userEmail) {
            return "Lietotājs ar šādu e-pastu ir reģistrēts!"
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

    }catch(err) {
        console.log(err)
        return {error: "Something went wrong while registering!"};
    }
}

export const login = async (formData) => {
    const {username,password} = Object.fromEntries(formData);

    try {
        await signIn("credentials",{username,password});
        dbConnect();


    }catch(err) {
        console.log(err)
        return {error: "Something went wrong!"};
    }
}

export const handleLogout = async () => {
    await signOut();
}