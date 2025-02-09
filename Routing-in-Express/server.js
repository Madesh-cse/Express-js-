const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandle')
const PORT = process.env.PORT || 3500;

//The next middleware function is commonly denoted by a variable named next.

// built-in middleware to handle urlencoded data
// in other words, form data:  
// ‘content-type: application/x-www-form-urlencoded’

console.log(__dirname)

//custome middleware
app.use(logger)

//cross origin resource sharing
const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}


app.use(cors(corsOptions))  
//often used to apply  middleware to all the routes
// global middleware 
app.use(express.urlencoded({ extended: false }));

//bulit-in  middleware for json
app.use(express.json())

//server static file
app.use(express.static(path.join(__dirname,'/public')))

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

// chaining route handlers
const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res) => {
    console.log('three');
    res.send('Finished!');
}

app.get('/chain(.html)?', [one, two, three])

//request all route with using all()
app.all('*',(req,res)=>{

   res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})

//500 Internal Server Error
app.use(errorHandler)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));