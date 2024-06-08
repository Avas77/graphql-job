import React, { Component, useEffect, useState } from "react";
import { JobList } from "./JobList";
import { loadJobs } from "./api";

export const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const jobsRes = () => loadJobs().then((res) => setJobs(res));
  useEffect(() => {
    jobsRes();
  }, []);
  console.log({ jobs });
  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
};
