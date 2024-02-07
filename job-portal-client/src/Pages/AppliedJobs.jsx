import React, { useEffect, useRef, useState } from "react";
import Jobs from "./Jobs";
import { Link, Navigate,useNavigate, useParams } from "react-router-dom";
import "../App.css";
// import Modell from "../components/Modell";
// import Extends from "./Extends";
import {FiCalendar, FiClock, FiDollarSign, FiMapPin} from 'react-icons/fi'

const AppliedJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const notesIntial = [];

  // const [notes, setnote] = useState(notesIntial);
  // const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    d();
  }, []);
  const d = async () => {
    const response = await fetch("http://localhost:5000/api/fetch/fetchnotes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    // Api call
    // console.log("geting all note")
    const json = await response.json();
    console.log(json);
    setJobs(json);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const result=data;

  // const {_id, JobTitle,companyName,minPrice,maxPrice,salaryType,jobLocation,postingDate,experienceLevel,employmentType,description,companyLogo,postedBy,skills} = jobs;
  const handleClick = () => {
      console.log();

      // <Extends  ></Extends>
      
      navigate("/extends");
    // <Modell/>
    
  };

  const {
    _id,
    companyName,
    companyLogo,
    JobTitle,
    minPrice,
    maxPrice,
    experienceLevel,
    salaryType,
    jobLocation,
    employmentType,
    postingDate,
    description,
    postedBy,
    skills,
  } = jobs;

  return (
    <>
      <div className="col-span-2 bg-white p-4 rounded-sm">
        <ul>
          {jobs.length != 0 &&
            jobs.map((user) => {
              return (
                <li key={user.id}>
                  <section className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-10">
                    <img
                      src={companyLogo}
                      alt="Company Logo"
                      className="h-36 w-36 rounded"
                    />
                    <div>
                      {/* <div className="box-card"  onClick={handleClick}> */}
                        <div className="box-card"  >
                        <div className="card-header">
                          <h2>{user.companyName}</h2>
                          <h4>{user.JobTitle}</h4>
                        </div>
                        <div>
                          <p> <span className='flex items-center gap-2'><FiMapPin/>{user.jobLocation}</span></p>
                         <p>
                         
                         </p>
                          <p>
                    <span className='flex items-center gap-2'><FiClock/>{user.employmentType}</span>
                    <span className='flex items-center gap-2'><FiDollarSign/>{user.minPrice}-{user.maxPrice}</span>
                    <span className='flex items-center gap-2'><FiCalendar/>{user.postingDate}</span>
                    </p>
                        </div>
                        <div className="card-body">
                          <p>{user.description}</p>
                        </div>
                      </div>
                      {/* <h4 className="text-primary mb-1">{companyName}</h4>
                      <h3 className="text-lg font-semibold mb-2">{JobTitle}</h3>
                      <div className="text-primary text-3xl text-bold flex flex-wrap gap-2 mb-2">
                        <ol className="list-decimal my-4">
                          <li>Company Name: {user.companyName}</li>
                          <li>Designation: {user.JobTitle}</li>
                        </ol>
                      </div>
                      <p className="text-base text-primary/70">{description}</p> */}
                    </div>
                  </section>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default AppliedJobs;
