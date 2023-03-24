const mongoose = require('mongoose');
const URI = "mongodb+srv://mybook:090078601@cluster0.duxelcc.mongodb.net/?retryWrites=true&w=majority";
const connectedToMongo = ()=>{
  mongoose.connect(URI, ()=> {
    console.log("Connected to MongoDB"); 
    
 });}


module.exports = connectedToMongo;