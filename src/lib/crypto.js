import CryptoJS from "crypto-js";
import { dbConnect } from "./utils";
import { User } from "./models";
import argon2 from "argon2";

//This implementation of a symmetric encryption/decryption 
//has originally been made by Halan Pinheiro and described in his dev.to blog entry.
//I have included userId and master password to produce a long and unique secret password
//that is being used as one of the base parameters in the key derivation function.

export const encrypt = async (vault, userId) => {
    const salt = CryptoJS.lib.WordArray.random(16);
    const iv = CryptoJS.lib.WordArray.random(16);
    try {
        await dbConnect();
        const user = User.findById(userId);
        const master = user.master;
        const secret = userId+master;
        const key = CryptoJS.PBKDF2(secret,salt, {
            keySize: 256/32,
            iterations: 10000,
            hasher: CryptoJS.algo.SHA256
        });
        const encrypted = CryptoJS.AES.encrypt(vault,key, {iv:iv}).ciphertext;
        const concatCipher = CryptoJS.lib.WordArray.create().concat(salt).concat(iv).concat(encrypted);
        
        return concatCipher.toString(CryptoJS.enc.Base64)
    } catch (error) {
        console.log('encryption error: ', error)
    }
  
}

export const decrypt = async (encryptedVault, userId) => {
    const encrypted = CryptoJS.enc.Base64.parse(encryptedVault);
    const salt_len = 16;
    const iv_len = 16;
    const salt = CryptoJS.lib.WordArray.create(
        encrypted.words.slice(0, salt_len / 4 )
      );
    const iv = CryptoJS.lib.WordArray.create(
        encrypted.words.slice(0 + salt_len / 4, (salt_len+iv_len) / 4 )
      );
    try {
        await dbConnect();
        const user = User.findById(userId);
        const master = user.master;
        const secret = userId+master;
        const key = CryptoJS.PBKDF2(secret,salt, {
            keySize: 256/32,
            iterations: 10000,
            hasher: CryptoJS.algo.SHA256
        });
        const decrypted = CryptoJS.AES.decrypt(
            {
            ciphertext: CryptoJS.lib.WordArray.create(
                encrypted.words.slice((salt_len+iv_len)/4)
            )
            },
            key,
            {iv:iv}
        )
        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.log("Decryption error: ",error)
    }
    
}


//handle login and master password hashing and verifying procedures.
//Hashing operations are done with argon2id algorithm.
export const genHash = async (value) => {
    const hashedValue = await argon2.hash(value);
    return hashedValue
}

export const checkHash = async (hashedValue, userInput) => {
    const validated = await argon2.verify(hashedValue,userInput);
    return validated
}