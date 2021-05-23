require ("dotenv").config();

const express = require('express')
const mongodb = require("mongodb")


const port = process.env.PORT || 3000
const app = express();

//DB connection 
const mongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017'
// const dbUrl="mongodb+srv://Banu:FGAO2wTeWzX3MjaL@cluster0.ldmgs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

app.use(express.json());



// app.get("/", async (req, res) => {
//     try {
//         let client = await mongoClient.connect(dbUrl);
//         let db = client.db("student");
//         let data = await db.collection("student").find().toArray();
//         if (data) {
//             res.status(200).json(data)
//         } else {
//             res.status(404).json({ message: "no data found" })
//         }
//         client.close();
//     }
//     catch(error){
//         console.log(error);
//         res.status(500).json({message:"Internal server error"})
//     }

// });



app.get("/", async (req, res) => {
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("mentor");
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

app.listen(port, () => console.log(`port runs with ${port}`));
//  //1.Write API to create Mentor
// app.post("/create",async(req,res)=>{
//     try {
//         let client = await mongoClient.connect(dbUrl);
//         let db = client.db("student");
//         await db.collection("student").insertOne(req.body)
//         res.status(200).json({message:"student created"})
//         client.close();
//     }
//     catch(error){
//         console.log(error);
//         res.status(500).json({message:"Internal server error"})
//     }

// });

// //2.Write API to create Student

// app.post("/create",async(req,res)=>{
//     try {
//         let client = await mongoClient.connect(dbUrl);
//         let db = client.db("student");
//         await db.collection("student").insertOne(req.body)
//         res.status(200).json({message:"student created"})
//         client.close();
//     }
//     catch(error){
//         console.log(error);
//         res.status(500).json({message:"Internal server error"})
//     }

// });


// //UPDATE

// app.put("/update/:id",async(req,res)=>{

//     try {
//         let client = await mongoClient.connect(dbUrl);
//         let db = client.db("student");
//         await db.collection("student").findOneAndUpdate({_id:objectId(req.params.id)},{$set:req.body})
//         res.status(200).json({message:"student updated"})
//         client.close();
//     }
//     catch(error){
//         console.log(error);
//         res.status(500).json({message:"Internal server error"})
//     }


// });

// //DELETE

// app.delete("/delete/:id",async(req,res)=>{
//     try {
//         let client = await mongoClient.connect(dbUrl);
//         let db = client.db("student");
//         await db.collection("student").deleteOne({_id:objectId(req.params.id)})
//         res.status(200).json({message:"student deleted"})
//         client.close();
//     }
//     catch(error){
//         console.log(error);
//         res.status(500).json({message:"Internal server error"})
//     }



// });


// app.post("/assign/:id",async(req,res)=>{
//     try {
//         let client = await mongoClient.connect(dbUrl);
//         let db = client.db("mentor");
//         await db.collection("mentor").findOneAndUpdate({_id:objectId(req.params.id)},{$set:req.body})
//         res.status(200).json({message:"student assigned"})
//         client.close();
//     }
//     catch(error){
//         console.log(error);
//         res.status(500).json({message:"Internal server error"})
//     }

// });

// app.put("/assign/:id",async(req,res)=>{
//     try {
//         let client = await mongoClient.connect(dbUrl);
//         let db = client.db("mentor");
//         await db.collection("mentor").update({_id:objectId(req.params.id)},{$push:req.body})
//         res.status(200).json({message:"new student assigned"})
//         client.close();
//     }
//     catch(error){
//         console.log(error);
//         res.status(500).json({message:"Internal server error"})
//     }

// });
























