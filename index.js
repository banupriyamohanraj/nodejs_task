require ("dotenv").config();

const express = require('express')
const mongodb = require("mongodb")
const cors = require('cors')


const port = process.env.PORT || 9000
const app = express();

//DB connection 
const mongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017'


app.use(express.json());
app.use(cors())



app.get("/student", async (req, res) => {
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("school");
        let data = await db.collection("student").find().toArray();
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: "no data found" })
        }
        client.close();
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }

});



app.get("/mentor", async (req, res) => {
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("school");
        let data = await db.collection("mentor").find().toArray();
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: "no data found" })
        }
        client.close();
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }

});


 //1.Write API to create Mentor
app.post("/createMentor",async(req,res)=>{
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("school");
        await db.collection("mentor").insertOne(req.body)
        res.status(200).json({message:"mentor created"})
        client.close();
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }

});

// //2.Write API to create Student

app.post("/createStudent",async(req,res)=>{
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("school");
        await db.collection("student").insertOne(req.body)
        res.status(200).json({message:"student created"})
        client.close();
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }

});



// //3.Write API to Assign a student to Mentor
app.put("/assign/:id",async(req,res)=>{
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("school");
        console.log(req)
        await db.collection("mentor").updateOne({_id:objectId(req.params.id)},{$push:req.body})
        res.status(200).json({message:"new student assigned"})
        client.close();
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }

});

// 3. Select one mentor and Add multiple Student 
app.put("/assignMany/:id",async(req,res)=>{
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("school");
        console.log(req)
        await db.collection("mentor").update({_id:objectId(req.params.id)},{$addToSet:req.body})
        res.status(200).json({message:"new student assigned"})
        client.close();
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }

});

//4.Write API to Assign or Change Mentor for particular Student
app.put("/change/:id/:newid",async(req,res)=>{
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("school");
        console.log(req)
        await db.collection("mentor").update({_id:objectId(req.params.id)},{$pull:req.body})
        await db.collection("mentor").update({_id:objectId(req.params.newid)},{$addToSet:req.body})
        res.status(200).json({message:"student has been removed and assined to different mentor"})
        client.close();
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }

});

//4.Select One Student and Assign one Mentor
app.put("/assignMentor/:id",async(req,res)=>{
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("school");
        console.log(req)
        await db.collection("student").updateOne({_id:objectId(req.params.id)},{$push:req.body})
        res.status(200).json({message:"new mentor assigned"})
        client.close();
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }

});

//5.Write API to show all students for a particular mentor
app.get("/mentor/:id", async (req, res) => {
    try {   
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("school");
        let data = await db.collection("mentor").find({_id:objectId(req.params.id)}).toArray();
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: "no data found" })
        }
        client.close();
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }

});




app.listen(port, () => console.log(`port runs with ${port}`));







