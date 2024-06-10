import React, { useEffect, useState } from "react";
import { loadCompanies } from "./api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { JobList } from "./JobList";

export const CompanyDetail = () => {
  const [company, setCompany] = useState(null);
  const { companyId } = useParams();

  useEffect(() => {
    loadCompanies(companyId).then((res) => setCompany(res.company));
  }, [companyId]);

  if (!company) return null;

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h1 className="title is-5">Jobs at {company.name}</h1>
      <JobList jobs={company.jobs} />
    </div>
  );
};
