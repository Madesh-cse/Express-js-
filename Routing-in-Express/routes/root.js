const express = require('express')
const router = express.Router();
const path = require('path')


// optional(.html) ?
router.get('^/$|/index(.html)?',(req,res)=>{
    // res.sendFile('./views/index.html',{root:__dirname})
    res.sendFile(path.join(__dirname, '..','views','index.html'))
})

// Node js server redirect
router.get('/new-page(.html)?',(req,res)=>{

    res.sendFile(path.join(__dirname,'..','views','new-page.html'))
})

//express js server redirect
// 301 e resource has been permanently moved to a new location
// 302 A 302 (found) status means the resource is temporarily located elsewhere.6 
router.get('/old-page(.html)?',(req,res)=>{

    res.redirect(301,'/new-page.html') // default 302
})

module.exports = router