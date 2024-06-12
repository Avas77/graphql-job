import { GraphQLError } from "graphql";
import { db } from "./db.js";
import jwt from "jsonwebtoken";

export const resolvers = {
  Query: {
    jobs: (_, args, context) => {
      if (!context.token) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      return db.jobs.list();
    },
    job: (_, args) => db.jobs.get(args.id),
    company: (_, args) => db.companies.get(args.id),
  },
  Mutation: {
    createJob: (_, { args }) => {
      const id = db.jobs.create(args);
      return db.jobs.get(id);
    },
    login: (_, { args }) => {
      let user;
      let token;
      try {
        user = db.users.list().filter((user) => {
          if (user.email === args.email && user.password === args.password)
            return user;
        })[0];
        token = jwt.sign(
          {
            id: user.id,
          },
          "user"
        );
      } catch (error) {
        console.log(error);
      }
      console.log("Token", token);
      return token;
    },
  },
  Jobs: {
    company: (job) => db.companies.get(job.companyId),
  },
  Company: {
    jobs: (company) =>
      db.jobs.list().filter((job) => job.companyId === company.id),
  },
};
