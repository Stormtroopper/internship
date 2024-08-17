const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js")

// let item = ["Buy Food", "Cook Food", "Study"];
// let working = [];
mongoose.connect("mongodb://localhost:27017/todolistDb", { useNewUrlParser: true });
const itemsSchema = {
    name: String
};
const ItemModel = mongoose.model(
    "Item", itemsSchema
);
const Itemdocument = new ItemModel({
    name: "Buy groceries"
});
const Itemdocument2 = new ItemModel({
    name: "Morning Run"
});
const Itemdocument3 = new ItemModel({
    name: "Send Mail"
});
const defaultitems = [Itemdocument, Itemdocument2, Itemdocument3];
ItemModel.insertMany(defaultitems, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Success");
    }
});

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    // let today = new Date();
    // let selectors = {
    //     weekday: "long",
    //     day: "numeric",
    //     month: "long"
    // };
    let day = date.getDate();
    res.render("list", { ListTitle: day, newlistitem: defaultitems });

});
app.get("/work", function (req, res) {
    res.render("list", { ListTitle: "Work for today", newlistitem: working });
});
app.post("/", function (req, res) {
    let newitem = req.body.newone;
    if (req.body.workinglist === "Work") {
        working.push(newitem);
        res.redirect("/work");
    } else {
        // console.log(req.body);
        item.push(newitem);
        res.redirect("/");
    }
})
app.post("/work", function (req, res) {
    newitem1 = req.body.newone;
    // console.log(item);
    item.push(newitem1);
    res.redirect("/work");
})
app.get("/about", function (req, res) {
    res.render("about");
});
app.listen(3000, function () {
    console.log("Server on port 3000");
});