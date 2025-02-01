"use server"

import dbConnect, { collectionName } from "@/lib/dbConnect"
import bcrypt from 'bcrypt'

export const registerUser = async (payload) => {
    console.log(payload)

    const userCollection = dbConnect(collectionName.userCollection)
    // validate 
    if(!payload.email || !payload.password) return {success : false, message:"email & password must be valid"};

    const isExist = await userCollection.findOne({email: payload.email})
    if(isExist){
        return {success:false, message:"User already exist"}
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10)
    payload.password = hashedPassword;
    const result = await userCollection.insertOne(payload)
    const {acknowledged, insertedId} = result;

    return {acknowledged, insertedId:insertedId.toString()};
}