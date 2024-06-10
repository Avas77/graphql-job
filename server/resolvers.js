import { db } from "./db.js";

export const resolvers = {
  Query: {
    jobs: () => db.jobs.list(),
    job: (_, args) => db.jobs.get(args.id),
    company: (_, args) => db.companies.get(args.id),
  },
  Jobs: {
    company: (job) => db.companies.get(job.companyId),
  },
  Company: {
    jobs: (company) =>
      db.jobs.list().filter((job) => job.companyId === company.id),
  },
};
