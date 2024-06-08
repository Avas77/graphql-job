export const typeDefs = `
    type Query {
        job(id: ID!): Jobs
        jobs: [Jobs]
    }

    type Company {
        id: ID!
        name: String
        description: String
    }

    type Jobs {
        id: ID!
        title: String
        description: String
        company: Company
    }
`;
