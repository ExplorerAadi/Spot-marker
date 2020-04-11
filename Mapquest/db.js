const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = "testmongo";
const url = "mongodb://localhost:27017";
const options = {useUnifiedTopology: true, useNewUrlParser : true};

const state = {
    db : null
};

const connect = (cb) => {
    if(state.db) {
        cb();
    }
    else {
        MongoClient.connect(url, options, (error, response) => {
            if(error) {
                cb(error);
            } else {
                state.db = response.db(dbname);
                cb();
            }
        })
    }
}

const getPrimaryKey = (_id) => {
    return ObjectID(_id);
}

const getDB = () => {
    return state.db;
}

module.exports = {connect, getDB, getPrimaryKey};