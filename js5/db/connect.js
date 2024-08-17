const connectionstring = "mongodb+srv://rjoseph3742:kSBUotnRcGd1L5EX@cluster0.kzeepqi.mongodb.net/?retryWrites=true&w=majority"
const connectDb = () => {
    return mongoose.connect(connectionstring, {
        useNewUrlParser: true, useUnifiedTopology: true
    })

}
module.exports = connectDb;