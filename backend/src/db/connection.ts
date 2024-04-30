import {connect, disconnect} from "mongoose"

//connect functions
async function connectToDatabase(){
    try{
        await connect(process.env.MONGODB_URL)
    }catch(err){
        console.log(err);
        throw new Error("Cannot  connect to Mongo DB")
    }
}

//disconnect function
async function disconnectToDatabase(){
    try{
        await disconnect()
    }catch(err){
        console.log(err);
        throw new Error("Cannot  connect to Mongo DB")
    }
}

export{connectToDatabase,disconnectToDatabase}