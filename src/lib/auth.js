import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { dbConnect } from "./utils";
import { User } from "./models";

export const {
    handlers: {GET,POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
    ],
    callbacks: {
        async signIn({user, account ,profile}) {
            console.log(profile);
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
    },
});