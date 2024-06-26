export const typeDefs = `
    type Query {
        job(id: ID!): Jobs
        jobs: [Jobs]
        company(id: ID!): Company
    }

    type Mutation {
        createJob(args: CreateJobInput): Jobs
        login(args: loginInput): String
    }

    type Company {
        id: ID!
        name: String
        description: String
        jobs: [Jobs]
    }

    type Jobs {
        id: ID!
        title: String
        description: String
        company: Company
    }

    input CreateJobInput {
        companyId: ID
        title: String
        description: String
    }

    input loginInput {
        email: String
        password: String
    }
`;
