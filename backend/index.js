const express = require('express');
const { z } = require('zod');
const bcrypt = require('bcrypt');
const { userModel } = require('./model');
const jwt = require("jsonwebtoken");
const { Keypair } = require('@solana/web3.js');
const { JWT_SECRET } = require('./config');

const app = express() ; 
app.use(express.json())

const requiredBody  = z.object({
    username : z.string().min(3).max(20),
    password : z.string().min(8).max(20) 
})

app.post("/api/v1/signup" , async ( req , res ) => { 

    const { success } = requiredBody.safeParse( req.body ) ; 
    if( !success ){
        return res.status(400).json({
            message : "Invalid data format"
        }) ;
    }

    const { username, password } = req.body ;
    const hashedPassword = await bcrypt.hash( password , 5 ) ; 

    const keyPair = new Keypair() ; 

    console.log("After Key Pair") ; 

    try{
        console.log("Before Dtabase")
        await userModel.create({
            username,
            password : hashedPassword , 
            publicKey : keyPair.publicKey.toString() ,
            privateKey : keyPair.secretKey.toString()
        })
        console.log("User creatde") ;
        return res.json({
            message : "Sign up Succesffully." ,
            publicKey : keyPair.publicKey.toString()
        })
    } catch( err ){
        return res.status(403).json({
            message : "Signup Err" ,
            err
        })
    }
    
})

app.post("/api/v1/signin" , async ( req , res ) => {
    const { success } = requiredBody.safeParse( req.body ) ; 
    if( !success ){
        return res.status(400).json({
            message : "Invalid data format"
        }) ;
    }

    const { username , password } = req.body ; 


    try{
        const user = await userModel.findOne({
            username 
        })

        if( !user ){
            return res.json({
                message : "User doesn't Exists"
            })
        }
    
        const comparePassword  = await bcrypt.compare( password , user.password ) ; 
    
        if( !comparePassword ){
            return res.json({
                message : "Wrong Password"
            })
        }
    
        const token = jwt.sign({
            userId : username
        } , JWT_SECRET ) ; 
    
        return res.json({
            message  : "Sigin Successfully." , 
            token  : token
        })
    } catch( err ){
        return res.json({
            err
        })
    } 
}) 

app.post("/api/v1/txn/sign" , ( req , res ) => {

}) 

app.listen( 3000 , async () => {
    console.log("Server is listening on Port : 3000 ")
})