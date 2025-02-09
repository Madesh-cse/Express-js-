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
// '/' default which is apply to public folder not subdir
app.use('/',express.static(path.join(__dirname,'/public')))
app.use('/subdir',express.static(path.join(__dirname,'/public')))

//routes for provied to the require(Router which we provied)
//routes
app.use('/subdir',require('./routes/subdir'))
app.use('/',require('./routes/root')) 
app.use('/employees',require('./routes/api/employees'))

//request all route with using all()
app.all('*',(req,res)=>{

   res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})

//500 Internal Server Error
app.use(errorHandler)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));