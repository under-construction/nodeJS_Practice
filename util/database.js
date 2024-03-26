const { MongoClient } = require('mongodb');

let _db;

const uri = 'mongodb+srv://sa:123@mongodbpractice123.zxtp6fe.mongodb.net/?retryWrites=true&w=majority&appName=mongoDBPractice123';

const client = new MongoClient(uri);
let conn = client.connect();

async function run() {
    try {
        _db = client.db('test');
        // cb(conn);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

const mongoConnect = async cb => {
    const conn = await MongoClient.connect(uri);
    _db = conn.db();
    cb(conn);
}

const getDB = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
exports.run = run;