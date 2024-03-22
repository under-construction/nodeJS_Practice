const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const uri = 'mongodb+srv://sa:123@mongodbpractice123.zxtp6fe.mongodb.net/?retryWrites=true&w=majority&appName=mongoDBPractice123';

const mongoConnect = cb => {
    MongoClient.connect(uri)
        .then(result => {
            _db = result.db();
            cb(result);
        })
        .catch(err => {
            console.log(err)
        });
}

const getDB = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;