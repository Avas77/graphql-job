import { db } from "./db.js";

export const resolvers = {
  Query: {
    jobs: () => db.jobs.list(),
  },
  Jobs: {
    company: (job) => db.companies.get(job.companyId),
  },
};
