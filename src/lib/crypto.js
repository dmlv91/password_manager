import argon2 from "argon2";
import CryptoJS from "crypto-js";
import { dbConnect } from "./utils";
import { User } from "./models";

export const generateKey = async (userId) => {
    
    const salt = CryptoJS.lib.WordArray.random(64);
    try {
        dbConnect();
        var user = await User.findById(userId);
        const key = CryptoJS.PBKDF2(user?.master,salt, {
            keySize: 512/32,
            iterations: 1000
        });
        console.log(key.toString())
        await User.updateOne({_id : userId},{$set : {vaultKey: JSON.stringify(key)}})
        return JSON.stringify(key)
    } catch (error) {
        console.log(error)   
    }

}

export const encryptVault = async (vault, key) => {
    const encryptedVault = CryptoJS.AES.encrypt(JSON.stringify(vault),key).toString();
    console.log(typeof(encryptedVault))
    return encryptedVault
}

export const decryptVault = async (vault,key) => {
    console.log(vault)
    console.log(key)
    const bytes = CryptoJS.AES.decrypt(vault,key);
    const decryptedVault = bytes.toString()
    return decryptedVault
}