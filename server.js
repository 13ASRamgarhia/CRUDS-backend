const express = require("express")
require("./db")
const User = require('./models/User')
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config({path: "./CONFIG.env"})

const PORT = process.env.PORT
const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "optionsSuccessStatus": 200
  }

const app = express()
app.use(cors(corsOptions))
app.use(express.json())

app.listen(PORT, () => {
    console.log("Server listening")
})

app.get("/", (req, res) => {
    res.status(200).json({
        "message": "Welcome to CRUDS",
        "about": "A single page application to showcase CRUD operation skills using MERN Stack",
        "createdBy": "Amandeep Singh",
        "developedIn": "May 2023",
        "requirements": {
            "Device with internet connection": true,
            "pen and paper": false
        },
        "developerProfile": "https://www.linkedin.com/in/13asr/",
        "cod": 200
    })
})

//Get users [GET]
app.get("/api/getUsers", async (req, res) => {
    try{
        const users = await User.find({})
        res.status(200).json({
            "message": "Users fetched successfully",
            "users": users,
            "cod": 200
        })
    }
    catch(error){
        res.status(201).json({
            "message": "Faied to fetch users",
            "error": error,
            "cod": 201
        })
    }
})

//Add user [POST]
app.post("/api/addUser", async (req, res) => {
    const {name, phone, email, hobbies} = req.body

    if(!name || !phone || !email){
        return res.status(201).json({
            "message": "Please enter all details",
            "cod": 201
        })
    }

    try{
        const user = new User({name, phone, email, hobbies})
        user.save()
        res.status(200).json({
            "message": "User added successfully",
            "cod":200
        })
    }
    catch(error){
        res.status(201).json({
            "message":  "Failed to add user",
            "error": error,
            "cod": 201
        })
    }
})

//Update User [PUT]
app.put("/api/updateUser/:id", async (req, res) => {
    const {name, phone, email, hobbies} = req.body
    const updatedUser = {}

    if(name){updatedUser.name = name}
    if(phone){updatedUser.phone = phone}
    if(email){updatedUser.email = email}
    if(hobbies){updatedUser.hobbies = hobbies}

    if(!updatedUser.name || !updatedUser.phone || !updatedUser.email){
        return res.status(201).json({
            "message": "Please enter all the details",
            "cod": 201
        })
    }

    try{
        let user = await User.findById(req.params.id)

        if(!user){
            return res.status(201).json({
                "message": "User not find. Something went wrong",
                "cod": 201
            })
        }

        user = await User.findByIdAndUpdate(req.params.id, {$set: updatedUser}, {new: true})
        res.status(200).json({
            "message": "User updated successfully",
            "user": user,
            "cod": 200
        })
    }
    catch(error){
        res.status(201).json({
            "message": "Failed to update user",
            "error": error,
            "cod": 201
        })
    }
})

//Delete user [DELETE]
app.delete("/api/deleteUser/:id", async (req, res) => {
    try{
        let user = await User.findById(req.params.id)

        if(!user){
            return res.status(201).json({
                "message": "User not find. Something went wrong",
                "cod": 201
            })
        }

        user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            "message": "User deleted successully",
            "cod": 200
        })
    }
    catch(error){
        res.status(201).json({
            "message": "Failed to delete user",
            "error": error,
            "cod": 201
        })
    }
})


/*
{
  "users": [
    {
      "_id": "64782721e7e42d36f1ec77a9",
      "name": "Amandeep Singh",
      "phone": 9999999999,
      "email": "aman@gmail.com",
      "hobbies": [
        {
          "hobby1": "gaming",
          "hobby2": "coding",
          "hobby3": "stargazing",
          "_id": "64782721e7e42d36f1ec77aa"
        }
      ],
      "__v": 0
    },
    {
      "_id": "647827c9bc4c87237e99d257",
      "id": "101",
      "name": "Amandeep Singh",
      "phone": 9999999999,
      "email": "aman@gmail.com",
      "hobbies": [
        {
          "hobby1": "gaming",
          "hobby2": "coding",
          "hobby3": "stargazing",
          "_id": "647827c9bc4c87237e99d258"
        }
      ],
      "__v": 0
    },
    {
      "_id": "6478280e830927f831223109",
      "name": "Amandeep Singh",
      "phone": 9999999999,
      "email": "aman@gmail.com",
      "hobbies": [
        {
          "hobby1": "gaming",
          "hobby2": "coding",
          "hobby3": "stargazing",
          "_id": "6478280e830927f83122310a"
        }
      ],
      "__v": 0
    },
    {
      "_id": "6478282c830927f83122310c",
      "name": "Amandeep Singh",
      "phone": 9999999999,
      "email": "aman@gmail.com",
      "hobbies": [
        {
          "hobby1": "gaming",
          "hobby2": "coding",
          "hobby3": "stargazing",
          "hobby4": "gaming",
          "hobby5": "coding",
          "_id": "6478282c830927f83122310d"
        }
      ],
      "__v": 0
    },
    {
      "_id": "6478284b830927f83122310f",
      "name": "Amandeep Singh",
      "phone": 9999999997,
      "email": "aman@gmail.com",
      "hobbies": [
        {
          "hobby1": "gaming",
          "hobby2": "coding",
          "hobby3": "stargazing",
          "hobby4": "gaming",
          "hobby5": "coding",
          "_id": "6478284b830927f831223110"
        }
      ],
      "__v": 0
    },
    {
      "_id": "64782868830927f831223112",
      "name": "Amandeep Singh",
      "phone": 9999999997,
      "email": "aman@gmail.com",
      "hobbies": [],
      "__v": 0
    }
  ],
  "cod": 200
}

*/