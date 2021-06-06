// const { User } = require("../model/User");
// const cookieParser = require("cookie-parser");

// /*
//     1. 쿠키에세 토큰을 가져옴
//     2. 토큰을 복호화 후 해당 user를 찾음
//        2-1 해당 user가 있으면 OK
//        2-2 해당 User가 없으면 NO
// */
// let auth = (req, res, next) => {
//   // 1번 작업
//   let token = req.cookies.x_auth;

//   // 2번 작업
//   User.findByToken(token, (err, user) => {
//     if (err) throw err;
//     if (!user)
//       return res.json({
//         isAuth: false,
//         error: true,
//       });

//     req.token = token;
//     req.user = user;
//     next();
//   });
// };

// module.exports = { auth };

const { User } = require("../model/User");

let auth = (req, res, next) => {
  //인증 처리를 하는곳
  //클라이언트 쿠키에서 토큰을 가져온다.

  let token = req.cookies.x_auth;
  // 토큰을 복호화 한후  유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    // console.log('userh', user)

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
