const express = require('express');
const router = express.Router();

const port = process.env.PORT || 5000;
require('dotenv').config();
// const multer = require('multer');
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../database');
// const jwt = require('jsonwebtoken');



// Posting a job`
router.post("/post-job", async(req, res)=>{
    const { jobsCollections } = await connectToDatabase();
    const body = req.body;
    body.appliedUsers = [];
    body.createAt = new Date();
    // console.log(body)
    const result = await jobsCollections.insertOne(body);
    if (result.insertedId) {
        return res.status(200).send(result);
    }else{
        return res.status(404).send({
            message:"cannot insert try again later!",
            status: false
        })
    }
})
router.post("/post-gjob", async(req, res)=>{
    const { govtCollection } = await connectToDatabase();
    const body = req.body;
    body.createAt = new Date();
    // console.log(body)
    const gresult = await govtCollection.insertOne(body);
    if (gresult.insertedId) {
        return res.status(200).send(gresult);
    }else{
        return res.status(404).send({
            message:"cannot insert try again later!",
            status: false
        });
    }
})

 // importing all jobs
 router.get("/all-jobs", async(req, res)=>{
    const { jobsCollections } = await connectToDatabase();
    const jobs = await jobsCollections.find({}).toArray();
    // const jobs = [...pjobs, ...gjobs];
    res.send(jobs)
})

router.get("/all-gjobs", async(req, res)=>{
    const {govtCollection } = await connectToDatabase();
    const gjobs = await govtCollection.find({}).toArray();
    res.send(gjobs)
})

// importing single job.
router.get("/all-jobs/:id", async(req,res)=>{
    const { recruitersCollection, seekersCollection, jobsCollections,resumeCollection } = await connectToDatabase();
  const id = req.params.id;
  const job = await jobsCollections.findOne({
    _id:new ObjectId(id)
  })
  res.send(job)
} )

router.get("/all-gjobs/:id", async(req,res)=>{
    const { govtCollection } = await connectToDatabase();
  const id = req.params.id;
  const job = await govtCollection.findOne({
    _id:new ObjectId(id)
  })
  res.send(job)
} )


// importing jobs by email.
router.get("/mypJobs/:email", async(req, res)=>{
    const { jobsCollections } = await connectToDatabase();
    // console.log(req.params.email)
    const jobs = await jobsCollections.find({postedBy : req.params.email}).toArray();
    res.send(jobs);
})
router.get("/mygJobs/:email", async(req, res)=>{
    const { govtCollection } = await connectToDatabase();
    // console.log(req.params.email)
    const jobs = await govtCollection.find({postedBy : req.params.email}).toArray();
    res.send(jobs);
})

  // deleting a job

    router.delete("/job/:id", async (req, res) => {
        const { recruitersCollection, seekersCollection, jobsCollections,resumeCollection } = await connectToDatabase();
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
    
      try {
        const result = await jobsCollections.deleteOne(filter);
        res.send(result);
      } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).send({
          message: "Internal server error",
          status: false
        });
      }
    });
    router.delete("/gjob/:id", async (req, res) => {
        const { govtCollection} = await connectToDatabase();
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
    
      try {
        const result = await govtCollection.deleteOne(filter);
        res.send(result);
      } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).send({
          message: "Internal server error",
          status: false
        });
      }
    });
    
    // Editing Jobs

    router.patch("/edit-job/:id", async(req,res)=>{
        const { recruitersCollection, seekersCollection, jobsCollections,resumeCollection } = await connectToDatabase();
        const id = req.params.id;
        const jobData = req.body;
        const filter = {_id: new ObjectId(id)};
        const options = {upsert:true}
        const updateDoc= {
          $set:{
              ...jobData
          },
        }

        const result = await jobsCollections.updateOne(filter,updateDoc,options);
        res.send(result)
    })
    router.patch("/edit-gjob/:id", async(req,res)=>{
        const { govtCollection } = await connectToDatabase();
        const id = req.params.id;
        const jobData = req.body;
        const filter = {_id: new ObjectId(id)};
        const options = {upsert:true}
        const updateDoc= {
          $set:{
              ...jobData
          },
        }

        const result = await govtCollection.updateOne(filter,updateDoc,options);
        res.send(result)
    })

module.exports = router