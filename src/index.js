
//require('dotenv').config({path:'./env'}) // this will work but it not good as its distrupting consiteny of code , as tis requie and all other will b import so we have other method 

import dotenv from "dotenv"
dotenv.config({
    path:'./env'
})
import connectDB from "./db/index.js";

connectDB()



























/*
import mongoose from "mongoose"
import { DB_NAME } from "./constants";
;(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    } catch (error) {
        console.error("ERROR : ",error)
        throw error 
    }
} )() // the semicolon is just a good practice 
//this also a approach but not so good instead cereate new file in db then connectio it and then execute it 

*/