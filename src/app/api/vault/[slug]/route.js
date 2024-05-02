import { encrypt, decrypt } from "@/lib/crypto";
import { User } from "@/lib/models";
import { dbConnect } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (request, {params}) => {
    const {slug} = params;
    try {
        await dbConnect();
        const user = await User.findById(slug)
        const decryptedVault = await decrypt(user.vault, slug)
        const res = JSON.parse(decryptedVault)
        return NextResponse.json(res);
    } catch (err) {
        console.log(err)
        throw new Error("Failed to fetch vault data!")
    }
}

export const POST = async (req) => {
    const {userId, vault} = await req.json();
    const encryptedVault = await encrypt(JSON.stringify(vault), userId)
    try {
        await dbConnect();
        await User.updateOne({_id : userId}, {$set: {vault: encryptedVault}})
        revalidatePath("/vault");
        return Response.json({message: "Šifrēšana veiksmīga!"})
    } catch (err) {
        console.log(err)
        throw new Error("Failed to fetch vault data!")
    }
}