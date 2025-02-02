import dbConnect, { collectionName } from "@/lib/dbConnect";
import bcrypt from 'bcrypt'

export const loginUser = async(payload)=>{
    const { email, password } = payload;
    const userCollection = dbConnect(collectionName.userCollection)
    const isExist = await userCollection.findOne({email}) 
    const isPassOk= bcrypt.compare(isExist.password, password)
    if(!isExist || !isPassOk){
        return {success:false, message: "Can't find a user with provided email or wrong credencial"}
    }
}