export const typeDefs = `
    type Query {
        job(id: ID!): Jobs
        jobs: [Jobs]
        company(id: ID!): Company
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
`;
