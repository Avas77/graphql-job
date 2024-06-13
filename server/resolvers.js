import { GraphQLError } from "graphql";
import { db } from "./db.js";
import jwt from "jsonwebtoken";

export const resolvers = {
  Query: {
    jobs: () => {
      return db.jobs.list();
    },
    job: (_, args) => db.jobs.get(args.id),
    company: (_, args) => db.companies.get(args.id),
  },
  Mutation: {
    createJob: (_, { args }, context) => {
      if (!context.token) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      const id = db.jobs.create(args);
      return db.jobs.get(id);
    },
    login: (_, { args }) => {
      let user;
      let token;
      user = db.users.list().filter((user) => {
        if (user.email === args.email && user.password === args.password)
          return user;
      })[0];
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: {
            code: "NOT_FOUND",
            http: { status: 404 },
          },
        });
      }
      try {
        token = jwt.sign(
          {
            id: user.id,
          },
          "user"
        );
        return token;
      } catch (error) {
        console.log(error);
      }
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
