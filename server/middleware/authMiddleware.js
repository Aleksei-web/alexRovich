 const isAdminMiddleware = (req, res, next) => {
  
   // req.session = req.headers
    console.log('middleware', req.session);
   
   next()
}

module.exports = isAdminMiddleware;