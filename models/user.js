const mongoose = require('mongoose');

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

const user = mongoose.model('User',userSchema) //유저 모델 (모델이름, 스키마)

module.export = {user};