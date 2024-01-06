const express = require('express')
const router=express.Router()
const {protect} = require('../middleware/authMiddleware')
const {resultData,allResult}=require('../controllers/resultController')

router.get('/student-result',resultData)
router.get('/all-result',allResult)


module.exports=router