// import express
import express from "express";
const router = express.Router();

// login
router.get('/',(req,res)=>{
    res.send('welcome to student backend')
})

export default router;