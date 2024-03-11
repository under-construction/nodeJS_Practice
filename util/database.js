const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const uri = 'mongodb+srv://sa:123@mongodbpractice123.zxtp6fe.mongodb.net/?retryWrites=true&w=majority&appName=mongoDBPractice123';

const mongoConnect = cb => {
    MongoClient.connect(uri)
        .then(result => {
            console.log('mongodb successfully connected...')
            cb(result);
        })
        .catch(err => console.log(err));
}

module.exports = mongoConnect;