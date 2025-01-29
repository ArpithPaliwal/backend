import mongoose, { mongo, Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
            
        },
        fullname:{
            type:String,
            required:true,
            trim:true
            
        },avatar:{
            type:String, //using cloudinary service 
            required:true,
            
        },
        coverImage:{
            type:String
        },
        watchHistory:[{
            type:Schema.type.ObjectId,
            ref:"Video"
        }],
        password:{
            type:string,
            required:[true,'password is required']
        },
        refreshToken:{
            type:string
        }
    },{
        timestamps:true
    }
)
//this is pre hook , this savesthe password
userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next()
})

//coustum prehook / method . this check the passwrod is correct or not 
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}


userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.generaterefreshToken = function(){
    return jwt.sign({
        _id:this._id,
        
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}


export const    User = mongoose.model("User",userSchema)