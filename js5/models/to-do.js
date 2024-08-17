const mongoose = require('mongoose')
const To_Do_Schema = new mongoose.Schema({
    name: String, completed: Boolean
})
module.exports = mongoose.model('ToDo', To_Do_Schema)