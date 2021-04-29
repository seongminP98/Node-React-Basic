const express = require('express') //npm install express --save
const app = express()
const port = 3000
const mongoose = require('mongoose'); //npm install mongoose --save
const {User} = require('./models/User');
const config = require('./config/key');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(config.mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
 .catch(err=>console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World@@~~!')
})

app.post('/register',(req,res)=>{
    const user = new User(req.body) 
    user.save((err, userInfo)=>{    //mongoDB에서오는 메소드. save()해두면 정보들이 user model에 저장이됨.
        if(err){
            return res.json({success: false.err})
        }
        return res.status(200).json({
            success: true
        })
    }) 
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})