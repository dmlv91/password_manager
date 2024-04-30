import { decryptVault, encryptVault, generateKey } from "@/lib/crypto";
import { User } from "@/lib/models";
import { dbConnect } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (request, {params}) => {
    const {slug} = params;
    try {
        dbConnect();
        const user = await User.findById(slug)
        // const decryptedVault = await decryptVault(user.vault,user.vaultKey)
        // console.log(decryptedVault)
        return Response.json(user.vault);
    } catch (err) {
        console.log(err)
        throw new Error("Failed to fetch vault data!")
    }
}

export const POST = async (req) => {
    const {userId, master, vault} = await req.json();

    const key = await generateKey(userId);
    const encryptedVault = await encryptVault(vault, key);
    try {
        dbConnect();
        await User.updateOne({_id : userId}, {$set: {vault: encryptedVault}})
        return Response.json({success: true})
    } catch (err) {
        console.log(err)
        throw new Error("Failed to fetch vault data!")
    }
}