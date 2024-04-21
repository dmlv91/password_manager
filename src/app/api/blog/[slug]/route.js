import { Post } from "@/lib/models";
import { dbConnect } from "@/lib/utils"
import { NextResponse } from "next/server";

export const GET = async (request,{params}) => {

    const {slug} = params;
    try {
        dbConnect();
        const post = await Post.findOne({slug});
        return NextResponse.json(post);

    } catch (err) {
        console.log(err)
        throw new Error("Failed to fetch post!")
    }
}