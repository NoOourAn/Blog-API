
module.exports = async (req,res,next)=>{
  let logObj = {
      url:req.url,
      method:req.method,
      CurrentTime:new Date()
  }
  console.log(logObj)
  next();
}


