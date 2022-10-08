const Package = require('../models/Package')

module.exports={
create:createPackage
}


async function createPackage(req,res) {
    try{
        await Package.createPackage(req)
    }catch(err){
        console.log(err)
    }
   
}