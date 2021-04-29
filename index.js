const express = require('express') //npm install express --save
const app = express()
const port = 3000
const mongoose = require('mongoose'); //npm install mongoose --save

mongoose.connect('mongodb+srv://psm:aaa1234@nodereactbasic.4c01x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
 .catch(err=>console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})