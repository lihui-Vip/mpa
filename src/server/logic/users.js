module.exports = function (router) {
  router.get('/users', (req, res) => res.json(['张三', '李四', '王五']).end());
}
