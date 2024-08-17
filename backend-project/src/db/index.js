import mongoose from 'mongoose'
import { db_name } from '../constant.js'
async function connectingDb() {
    try {
        const connectionresp = await mongoose.connect(`${process.env.MONGODB_URL}/${db_name}`)
        console.log(`MongoDb connected!${connectionresp.connection.host}`)
    } catch (e) {
        console.error('Connection error', e)
        process.exit(1)
    }
}
export default connectingDb;