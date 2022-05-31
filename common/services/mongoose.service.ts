import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let count = 0;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;


const options = {
    autoIndex: false, // Don't build indexes
    // If not connected, return errors immediately rather than waiting for reconnect
    // all other approaches are now deprecated by MongoDB:
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const db = mongoose;
if(!DB_CONNECTION_STRING) throw new Error('DB_CONNECTION_STRING is not defined');

const connectWithRetry = () => {
    console.log('MongoDB trying to connect to MongoDB')
    db.connect(DB_CONNECTION_STRING, options).then(()=>{
        console.log('MongoDB is connected')
    }).catch(err=>{
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
        console.log(err)
        setTimeout(connectWithRetry, 5000)
    })
};

connectWithRetry();

export default db