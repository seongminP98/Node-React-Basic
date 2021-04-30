const express = require('express') //npm install express --save
const app = express()
const port = 3000
const mongoose = require('mongoose'); //npm install mongoose --save
const {User} = require('./models/User');
const config = require('./config/key');
const cookieParser = require('cookie-parser');
const {auth} = require('./middleware/auth');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

app.post('/api/users/register',(req,res)=>{
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

app.post('/api/users/login',(req,res)=>{
    //요청된 이메일을 DB에 있는지 찾는다.
    User.findOne({email: req.body.email}, (err,user)=>{
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
    
    //요청된 이메일이 DB에 있다면 비밀번호 확인.
    user.comparePassword(req.body.password, (err,isMatch)=>{
        if(!isMatch){
            return res.json({loginSuccess: false, message: "비밀번호 틀림"})
        }
        //비밀번호가 맞다면 토큰을 생성하기.
        user.generateToken((err,user)=>{ //User의 메소드 generateToken으로 function(err,user)전달.
            if(err) return res.status(400).send(err);

            //토큰을 쿠키에 저장한다.
            res.cookie("x_auth",user.token) //쿠키에 이름x_auth와 토큰이 들어감
            .status(200).json({loginSuccess: true, userId: user._id})
        })
    })
})
})

app.get('/api/users/auth',auth,(req,res)=>{
    //여기까지 오면 auth미들웨어 통과(인증 true)
    res.status(200).json({
        _id: req.user._id,  //req.user를 사용할 수 있는건 auth에서 req.user에 user를 넣었기 때문.
        isAdmin: req.user.role === 0 ? false : true,
        isAuthL: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout',auth,(req,res)=>{
    User.findOneAndUpdate({_id: req.user._id},  //req.user는 auth에서 가져옴
        {token: ""},
        (err,user)=>{
            if(err) return res.json({success: false, err});
            return res.status(200).send({
                success: true
            })
        })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})