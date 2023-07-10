

const urlMongo = "mongodb://localhost:27017/Rhell";
const { MongoClient } = require('mongodb');
const database = new MongoClient(urlMongo).db("Rhell");
const { ObjectId } = require('mongodb');
const COLLECTION_USERS = "RH_Users"

async function createDatabase(){
    database.createCollection(COLLECTION_USERS)
}
async function dropCollection(){
    database.dropCollection(COLLECTION_USERS)
    
}
async function authenticate(username,password){
    return database.collection(COLLECTION_USERS).find({ "username": username, "psw": password }).toArray().then(resAuth => {
        if (resAuth.length == 0) { //not found or error return null
            return null;
        } else {
            return resAuth
        }
    }).catch(err=>{
        console.log(err)
    })
}

async function insertUser(username,password){
    createDatabase();
    return database.collection(COLLECTION_USERS).insertOne({"username":username,"psw":password}).then(resInsert=>{
        console.log(resInsert)
    })
}


module.exports={
    authenticate: authenticate,
    insertUser: insertUser,
    test: test
}

