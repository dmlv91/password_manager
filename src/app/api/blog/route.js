import { Post } from "@/lib/models";
import { dbConnect } from "@/lib/utils"
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        await dbConnect();
        const posts = await Post.find();
        return NextResponse.json(posts);

    } catch (err) {
        console.log(err)
        throw new Error("Failed to fetch posts!")
    }
}