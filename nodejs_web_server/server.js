const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500;

console.log(__dirname)

// optional(.html) ?
app.get('^/$|/index(.html)?',(req,res)=>{
    // res.sendFile('./views/index.html',{root:__dirname})

    res.sendFile(path.join(__dirname,'views','index.html'))
})

// Node js server redirect
app.get('/new-page(.html)?',(req,res)=>{

    res.sendFile(path.join(__dirname,'views','new-page.html'))
})

//express js server redirect
// 301 e resource has been permanently moved to a new location
// 302 A 302 (found) status means the resource is temporarily located elsewhere.6 
app.get('/old-page(.html)?',(req,res)=>{

    res.redirect(301,'/new-page.html') // default 302
})

//Route Handler

app.get('/hello(.html)?',(req,res,next)=>{
    console.log('attempt to load the hello.html')
    next()
},(req,res)=>{
    res.send('Hello World')
})


app.get('/*',(req,res)=>{

   res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));