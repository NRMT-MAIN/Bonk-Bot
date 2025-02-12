const express = require('express')

const app = express() ; 

app.post("/api/v1/signup" , ( req , res ) => {
    const { username , password } = req.body ; 
    
    res.json({
        message : "Sign up"
    })
})

app.post("/api/v1/signin" , ( req , res ) => {

}) 

app.post("/api/v1/txn/sign" , ( req , res ) => {

}) 