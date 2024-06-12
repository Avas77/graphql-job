import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadJobs } from "./api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export const JobDetail = () => {
  const [job, setJob] = useState(null);
  const { jobId } = useParams();

  useEffect(() => {
    loadJobs(jobId).then((res) => setJob(res.job));
  }, [jobId]);

  if (!job) {
    return null;
  }
  return (
    <div>
      <h1 className="title">{job.title}</h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className="box">{job.description}</div>
    </div>
  );
};
