if (process.env.NODE_ENV == "production") {
  module.exports = require("./prod"); // 배포시
} else {
  module.exports = require("./dev"); // 개발시
}
