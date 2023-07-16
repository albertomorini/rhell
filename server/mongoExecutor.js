

const urlMongo = "mongodb://localhost:27017/Rhell";
const { MongoClient } = require('mongodb');
const database = new MongoClient(urlMongo).db("Rhell");
const { ObjectId } = require('mongodb');
const COLLECTION_USERS = "RH_Users"
const COLLECTION_WIDGETS = "RH_Widgets"

//////////
async function authenticate(username,password){
    return database.collection(COLLECTION_USERS).find({ "username": username, "psw": password }).toArray().then(resAuth => {
        if (resAuth.length == 0) { //not found or error return null
            return null;
        } else {
            return resAuth[0]
        }
    }).catch(err=>{
        console.log(err)
    })
}


async function mngWidget(action, username, title=null, command=null, type=null, IDWidget=null){
    if(action=="R"){
        database.collection(COLLECTION_WIDGETS).find({}).toArray().then(res=>{
            console.log(res)
        })
        return database.collection(COLLECTION_WIDGETS).find({"username":username}).toArray();
    }else if(action=="I"){
        return database.collection(COLLECTION_WIDGETS).insertOne({
            "username": username,
            "title": title,
            "command": command,
            "type": type
        })
    }else if(action=="D"){
        return database.collection(COLLECTION_WIDGETS).deleteOne({ _id: new ObjectId(IDWidget)})
    }else if (action=="U"){
        //TODO: 
    }
}

//////////
async function createDatabase(){
    database.createCollection(COLLECTION_USERS)
}
async function dropCollection(){
    database.dropCollection(COLLECTION_USERS)
    
}


async function insertUser(username,password){
    return database.collection(COLLECTION_USERS).insertOne({"username":username,"psw":password}).then(resInsert=>{

    })
}

async function deleteUsers(){
    return database.collection(COLLECTION_USERS).deleteMany({}).then(resDelete=>{
        console.log(resDelete)
    })
}

module.exports={
    authenticate: authenticate,
    insertUser: insertUser,
    deleteUsers: deleteUsers,
    mngWidget: mngWidget
}

