import { db } from "./db.js";

export const resolvers = {
  Query: {
    jobs: () => db.jobs.list(),
    job: (obj, args) => db.jobs.get(args.id),
  },
  Jobs: {
    company: (job) => db.companies.get(job.companyId),
  },
};
