const express= require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const PORT=8000
const FacultyModel=require('./models/faculty')
const DataModel = require('./models/data')
const multer = require("multer")

const app=express()
app.use(express.json())
app.use(cors())

const upload = multer({dest: "uploads/"})

app.use(express.urlencoded({extended: false}))

mongoose.connect("mongodb://127.0.0.1:27017/faculty")

app.post('/', (req,res)=>{
    FacultyModel.create(req.body)
    .then(faculties => res.json(faculties))
    .catch(err=>res.json(err))
})

app.post('/login',(req,res)=>{
    const {email, password}=req.body;
    FacultyModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password === password){
                res.json({data:"Success", id:user.id})
            }
            else{
                res.json("the password is incorrect")
            }
        } else{
            res.json("No user found")
        }
    })
})

app.get('/dashboard/:id',(req,res)=>{
    let id= req.params.id
    FacultyModel.findById(id).then((doc)=> {
        res.send(doc)
        })
        .catch((e)=>console.error(e));
})

app.post('/dashboard/:id', (req,res)=>{
    let id= req.params.id
    DataModel.findOne({facultyId:id})
    .then(user=>{
        if(user){
            console.log(req.body)
            if(req.body.achievements!='')
                user.achievements.push(req.body.achievements)
            if(req.body.awards!='')
                user.awards.push(req.body.awards)
            if(req.body.certificates!='')
                user.certificates.push(req.body.certificates)
            console.log("user")
            console.log(user)
            const result = DataModel.updateOne({facultyId:id},{
                $set: {
                    achievements:user.achievements,
                },
                $currentDate: { lastUpdated: true }
            })
        } else{
            console.log(req.body)
            DataModel.create(req.body)
            .then(
                facultydatas=>res.json(facultydatas)
            )
            .catch(err=>res.json(err))
        }

    })
})


app.listen(PORT, ()=>{console.log(`server in running on port ${PORT}`)})

