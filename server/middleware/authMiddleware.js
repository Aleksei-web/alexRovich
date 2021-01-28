 const isAdminMiddleware = (req, res, next) => {
   console.log(req.session);
  if(!req.session.admin) {
    return res.sendStatus(400)
  } else {
    next()
  }
}

module.exports = isAdminMiddleware;