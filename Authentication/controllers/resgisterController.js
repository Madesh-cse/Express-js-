
const userDB = {
    users: require('../modal/user.json'),
    setusers: function(data) {this.users = data}
}

const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');


const handlerNewuser = async (req,res)=>{

    const{user,pwd} = req.body;
    if(!user || !pwd)
        return res.status(400).json({"message":"username and password are required"})
    //find duplicate username in the db
    const duplicate = userDB.users.find((person)=>person.username === user)
    if(duplicate){
        return res.sendStatus(409) // conflict
    }
    try{
        //encryption
        const hasedPwd = await bcrypt.hash(pwd,10)
        //new user store in db
        const newUser = {"username":user,"password":hasedPwd}
        // create a new array for userdata without  updating a existing array
        userDB.setusers([...userDB.users,newUser])
        await fs.writeFile(path.join(__dirname,'..','modal','user.json'),
        json.stringify(userDB.users)

    )
    console.log(userDB.users)
    res.status(201).json({"message":`New User ${user} created`})

    }
    catch(err){
        res.status(500).json({"message":err.message})
    }
}

module.exports = {handlerNewuser}