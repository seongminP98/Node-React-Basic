const {User} = require('../models/User');
let auth = (req,res,next)=>{
    //인증처리를 하는곳

    //클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;    
    //토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token, (err,user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error: true})

        req.token = token;
        req.user = user;
        next();  //auth는 미들웨어로 작동해서 next()넣어줘야 함.
    })
    //유저가 있으면 인증 완료.

    //유저가 없으면 인증 안됨.
}

module.exports = {auth};