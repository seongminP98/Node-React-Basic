const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


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
    }
})  

const User = mongoose.model('User',userSchema) //유저 모델 (모델이름, 스키마)

module.exports = {User};