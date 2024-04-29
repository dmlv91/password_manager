import { User } from "@/lib/models";
import { dbConnect } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, {params}) => {
    const {slug} = params;
    try {
        dbConnect();
        const user = await User.findById(slug)
        return NextResponse.json(user.vault);
    } catch (err) {
        console.log(err)
        throw new Error("Failed to fetch vault data!")
    }
}

export const POST = async (req) => {
    const {userId, master, vault} = await req.json();
    try {
        dbConnect();
        const user = await User.findById(userId)
        return Response.json(user)
    } catch (err) {
        console.log(err)
        throw new Error("Failed to fetch vault data!")
    }
}