

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
        //TODO: implement
    }
}


async function insertUser(username,password){
    return database.collection(COLLECTION_USERS).insertOne({"username":username,"psw":password})
}

async function deleteUser(username){
    database.collection(COLLECTION_WIDGETS).deleteMany({"username":username}); //REMOVE ALSO THE WIDGETS
    return database.collection(COLLECTION_USERS).deleteMany({"username":username});
}

/**
 * @returns get all users
 */
async function getUsers(){
    return database.collection(COLLECTION_USERS).find({}).toArray();
}

module.exports={
    authenticate: authenticate,
    insertUser: insertUser,
    deleteUser: deleteUser,
    mngWidget: mngWidget,
    getUsers: getUsers
}

