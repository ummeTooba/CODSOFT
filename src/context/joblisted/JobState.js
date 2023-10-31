import React,{useState} from 'react';
import Jobcontext from "./JobContext";

const JobState =(props)=>{
    const jobsInitial = [
        {
          "_id": "653edb822cb9d2bd1a4f4b71",
          "employer": "653ec50b1d5a336e028db60e",
          "title": "second job updated",
          "companyname": "Zetalogs xyz",
          "description": "filing documentation,all important",
          "skills": [
            "java",
            "teaching"
          ],
          "location": "karchi",
          "salaryRange": "$100- $100",
          "applicationDeadline": "2023-11-22T00:00:00.000Z",
          "__v": 0
        },
        {
          "_id": "653fc0785b574aeb34f116bb",
          "employer": "653ec50b1d5a336e028db60e",
          "title": "sixth job",
          "companyname": "Systems limited",
          "description": "filing documentation,all important",
          "skills": [
            "java",
            "teaching"
          ],
          "location": "karchi",
          "salaryRange": "$100- $100",
          "applicationDeadline": "2023-11-22T00:00:00.000Z",
          "__v": 0
        },
        {
          "_id": "653fe48a493bf3cfef2308ea",
          "employer": "653ec50b1d5a336e028db60e",
          "title": "6 job",
          "companyname": "Riztech limited",
          "description": "filing documentation,all important",
          "skills": [
            "java",
            "teaching"
          ],
          "location": "karchi",
          "salaryRange": "$100- $100",
          "applicationDeadline": "2023-11-22T00:00:00.000Z",
          "__v": 0
        }
      ]
    const [jobs, setJobs] = useState(jobsInitial);
    return(
        <Jobcontext.Provider value={{jobs,setJobs}}>
            {props.children}
        </Jobcontext.Provider>
    )
}
export default JobState;