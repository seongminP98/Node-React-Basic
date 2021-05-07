const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({ //유저 스키마
    name:{
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true,     //공백을 없애줌. pseong min@naver.com을 pseongmin@naver.com으로 바꿔줌
    },
    password:{
        type: String,
        minlength: 5
    },
    lastname:{
        type: String,
        maxlength: 50
    },
    role:{
        type: Number,
        defaule: 0
    },
    image: String,
    token:{
        type: String
    },
    tokenExp:{
        type: Number
    }
})

userSchema.pre('save', function(next){//pre는 mongoose메소드. 
    //비밀번호를 암호화 시킨다.
    let user = this; //위의 유저스키마를 가리킴

    if(user.isModified('password')){ //password가 변환될때만 암호화.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash //암호화된 비밀번호로 바꿔줌.
                next();
            });
        });
    } else{
        next()
    }
})  

userSchema.methods.comparePassword = function(plainPassword, cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err)

        cb(null,isMatch)
    })
}

userSchema.methods.generateToken = function(cb){ //cb = function(err,user)
    let user = this;
    //jsonwebtoken을 이용해 토큰 생성하기
    let token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user) //에러가 없다면
    })
    
}

userSchema.statics.findByToken = function(token, cb){
    let user = this;

    //토큰은 decode한다.
    jwt.verify(token,'secretToken',function(err,decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id": decoded, "token": token}, function(err,user){//mongoDB메소드 findOne
            if(err) return cb(err);
            cb(null,user);
        })
    })
}


const User = mongoose.model('User',userSchema) //유저 모델 (모델이름, 스키마)

module.exports = {User};