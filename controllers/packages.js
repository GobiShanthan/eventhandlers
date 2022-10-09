const Package = require('../models/Package')

module.exports={
create:createPackage,
getAll,
getByUserId,
getByUser,
deleteById
}

//CREATE A PACKAGE
async function createPackage(req,res) {
    try{
        await Package.createPackage(req)
    }catch(err){
        console.log(err)
    }
   
}

//GET ALL PACKAGES
async function getAll(req,res) {
    try{
        let data = await Package.getAllPackages()
        res.status(200)
        res.json(data)
    }catch(err){
        console.log(err)
    }
   
}

//GET ALL PACKAGES THAT MATCH PARAMS USER ID
async function getByUserId(req,res) {
    try{
        let data = await Package.getByUserId(req.params.id)
        res.status(200)
        res.json(data)
    }catch(err){
        console.log(err)
    }
   
}

//GET ALL PACKAGES THAT MATCH PARAMS USER ID
async function getByUser(req,res) {
    try{
        let data = await Package.getByUser(req.user._id)
        res.status(200)
        res.json(data)
    }catch(err){
        console.log(err)
    }
   
}





//DELETE PACKAGE THAT MATCHES PARAMS PACKAGE ID
async function deleteById(req,res) {
    try{
        let data = await Package.deletePackage(req.params.id)
        res.status(200)
        res.json(data)
    }catch(err){
        console.log(err)
    }
   
}