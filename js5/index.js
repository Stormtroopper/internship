const express = require("express")
require('dotenv').config();
const app = express();
const routes = require('./routes/to-do')
const connecting = require('./db/connect')

const port = 3000;
const mongoose = require("mongoose")
//express middleware
app.use(express.json())
//routes
app.get("/hello", (req, res) => {
    res.send("To-do-List")
})

app.use('./api/v1/to-do', routes)

app.get('/api/v1/to-do')
app.post('/api/v1/to-do')
app.get('/api/v1/to-do/id:')
app.patch('/api/v1/to-do/:id')
app.delete('/api/v1/to-do/:id')


const start = async () => {
    try {
        await connecting(process.env.MONGO_DB_URI)
        app.listen(port, console.log(`Server running at ${port}`))
    } catch (err) {
        console.log(err);
    }
}
console.log("Hello");
