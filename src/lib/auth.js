import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "./utils";
import { User } from "./models";
import argon2 from "argon2";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
const login = async (credentials) => {
    try {
        dbConnect();
        const user = await User.findOne({username: credentials.username})

        if(!user) {
            throw new Error("Nepareizi pieejas dati!")
        }

        const isPasswordCorrect = await argon2.verify(user.password, credentials.password);

        if (!isPasswordCorrect) {
            throw new Error("Nepareiza parole!")
        }
        return user;
    } catch (error) {
        console.log(error)
        throw new Error("Autentifikācijas kļūda!")
    }
}

export const {
    handlers: {GET,POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user;
                } catch (error) {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async signIn({user, account ,profile}) {
            if(account.provider == "github") {
                dbConnect();
                try {
                    const user = await User.findOne({email: profile.email});

                    if(!user) {
                        const newUser = new User({
                            username: profile.login,
                            email: profile.email,
                            image: profile.avatar_url,
                        });

                        await newUser.save();
                    }
                }catch(err){
                    console.log(err)
                    return false;
                }
            }
            return true
        },
        ...authConfig.callbacks,
        
    },
});