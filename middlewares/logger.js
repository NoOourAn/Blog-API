var express = require('express')
var router = express.Router()

router.use((req,res,next)=>{
  let logObj = {
      url:req.url,
      method:req.method,
      CurrentTime:new Date()
  }
  console.log(logObj)
  next();
})

module.exports = router