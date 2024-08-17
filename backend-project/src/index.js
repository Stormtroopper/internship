// require('dotenv').config({ path: './env' })
import dotenv from 'dotenv'
import connectingDb from './db/index.js'

dotenv.config({
    path: './env'
})
connectingDb()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(` Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })





// import express from "express"
// const app = express()
// async function connectingDb() {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${db_name}`)
//         app.on("error", (e) => {
//             console.log('Unable to connect the database', e);
//             throw e
//         })
//         app.listen(process.env.PORT, () => { console.log(`App listening on port ${process.env.PORT}`) })
//     } catch (e) {
//         console.error(e)
//         throw error
//     }
// }
connectingDb()