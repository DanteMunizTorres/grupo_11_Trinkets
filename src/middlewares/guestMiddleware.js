function guestMiddleware(req, res, next) {
  if (req.session.userLogged) {
    return res.redirect('../views/user/profile')
  }
  next()
}

module.exports = guestMiddleware;