const express = require('express');
const router = express.Router()

///routes handlers
router.get('/',async (req,res)=>{
    await res.status(404).json({success:false,message:"not found"})
})

module.exports = router