import { User } from "@/lib/models";
import { dbConnect } from "@/lib/utils";
import { NextResponse } from "next/server";


export const POST = async (request, response) => {
    // const {userId, master, vault} = params;
    const data = request.body;
    console.log(data);
    return NextResponse({success : true});
    // try {
    //     dbConnect();
    //     const user = await User.findOne(userId);
    //     return {success: true}
    // } catch (err) {
    //     console.log(err)
    //     throw new Error("Failed to fetch posts!")
    // }
}