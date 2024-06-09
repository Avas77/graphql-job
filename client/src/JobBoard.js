import React, { useEffect, useState } from "react";
import { JobList } from "./JobList";
import { loadJobs } from "./api";

export const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const jobsRes = () => loadJobs().then((res) => setJobs(res.jobs));
  useEffect(() => {
    jobsRes();
  }, []);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
};
