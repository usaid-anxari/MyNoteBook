const connectedToMongo = require ("./db")
const express = require('express');
const { default: mongoose } = require("mongoose");
connectedToMongo();
const app = express()
const port = 5000

app.use(express.json()),

// mongoose.set('strictQuery', false);
// mongoose.set('strictQuery', true);

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

