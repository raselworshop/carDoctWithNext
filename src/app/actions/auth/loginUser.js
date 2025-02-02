import dbConnect, { collectionName } from "@/lib/dbConnect";
import bcrypt from 'bcrypt'

export const loginUser = async(payload)=>{
    const { email, password } = payload;
    const userCollection = dbConnect(collectionName.userCollection)
    const isExist = await userCollection.findOne({email})

    console.log("existing pass",isExist, "query pass", password ) 
    const isPassOk= bcrypt.compare(password, isExist.password)
    if(!isExist){
        return {success:false, message: "Can't find a user with provided email or wrong credencial"}
    }
    if (!isPassOk) {
        return { success: false, message: "Wrong credentials" };
    }
    return { success: true, message: "Login successful" };
}