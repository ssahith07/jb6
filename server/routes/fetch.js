// const express = require('express');
// const router = express.Router();
// // const getuser = require('../middleware/getuser')


// const port = process.env.PORT || 5000;
// require('dotenv').config();
// const multer = require('multer');
// const { ObjectId } = require('mongodb');
// const { connectToDatabase } = require('../database');
// const jwt = require('jsonwebtoken');
// const { get } = require('mongoose');
// const getUser=require('../middleware/getuser');
// const jobs = require('../models/jobs');








// router.post('/addJobPosting',getUser,
//     // You can add more validations as per your schema requirements
//     async (req, res) => {
//         try {
    
        
//             const { JobTitle, companyName, minPrice, maxPrice, salaryType, jobLocation, postingDate, experienceLevel, companyLogo, employmentType, description, skills } = req.body;
    
//             // Assuming req.user.id contains the ID of the user who is posting the job
//             // console.log(req)
//             const postedBy = req.body._id;
//         const user=req.userid;
//         const existingJobPosting = await jobs.findOne({
//             user: user,
//             postingDate: postingDate , // Use the provided date or set to now
//             JobTitle,
//         });

//         if (existingJobPosting) {
//             // If a job posting with the same combination exists, return an error
//             return res.status(400).json({ message: 'A job posting with the same user, posting date, and JobTitle already exists.' });
//         }
//             // Create a new job posting
//             const jobPosting = new jobs({
//                 user,
//                 JobTitle,
//                 companyLogo,
    
//                 companyName,
//                 description,
//                 employmentType,
//                 experienceLevel,
//                 jobLocation,
    
//                 maxPrice,
//                 minPrice,
//                 postedBy,
//                 postingDate: postingDate, // Use the provided date or set to now
//                 salaryType,
//                 skills,
//                 // createAt is set by default in the schema
//             });
//     console.log("backend")
//             // Save the job posting to the database
//             const savedJobPosting = await jobPosting.save();
//             res.status(201).json(savedJobPosting);
//         } catch (error) {
//             console.error(error.message);
//             res.status(500).send("An error occurred");
//         }
// }
// );

// router.get('/fetchnotes', getUser, async (req, res) => {// this gives the notes  of the loged user
//     try {
//         const notes = await jobs.find({ user: req.userid });
//         res.send(notes)
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Error occured");
//     }
// })


// module.exports = router;