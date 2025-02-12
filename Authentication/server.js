const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const {logger} = require('./middleware/logEvents')
const corsOptions = require('./config/corsOptions')
const errorHandler = require('./middleware/errorHandle')
const PORT = process.env.PORT || 3500;

//The next middleware function is commonly denoted by a variable named next.

// built-in middleware to handle urlencode 
// in other words, form data:  
// ‘content-type: application/x-www-form-urlencoded’

console.log(__dirname)

//custome middleware
app.use(logger)


app.use(cors(corsOptions))  
//often used to apply  middleware to all the routes
// global middleware 
app.use(express.urlencoded({ extended: false }));

//bulit-in  middleware for json
app.use(express.json())

//server static file
// '/' default which is apply to public folder not subdir
app.use('/',express.static(path.join(__dirname,'/public')))

//routes for provied to the require(Router which we provied)
//routes
app.use('/',require('./routes/root')) 
app.use('/register',require('./routes/register')) 
app.use('/auth',require('./routes/auth')) 
app.use('/employees',require('./routes/api/employees'))

//request all route with using all()
app.all('*',(req,res)=>{

   res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})

//500 Internal Server Error
app.use(errorHandler)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));