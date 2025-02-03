import { NextResponse } from "next/server";
import dbConnect, { collectionName } from "@/lib/dbConnect";

export const POST = async (req) => {

    const body = await req.json();
    const bookingCollection = dbConnect(collectionName.bookingCollection)
    const result = await bookingCollection.insertOne(body)

    return NextResponse.json(result)
}