"use server";

import { signIn, signOut } from "./auth";
import { User } from "./models";
import { dbConnect } from "./utils";
import bcrypt from "bcryptjs";

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

export const login = async (formData) => {
    const {username,password} = Object.fromEntries(formData);

    try {
        await signIn("credentials",{username,password});
    }catch(err) {
        console.log(err)
        return {error: "Kļūda! Mēģiniet"};
    }
}

export const handleLogout = async () => {
    await signOut();
}