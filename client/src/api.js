const url = "http://localhost:4000/graphql";

async function graphqlRequest(query, variables = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const responseBody = await response.json();
  return responseBody.data;
}

export async function loadJobs(id) {
  let query;
  if (id) {
    query = `query JobQuery($jobId: ID!) {
      job(id: $jobId) {
      id
      title
      description
      company {
        id
        name
          }
        }
    }`;
  } else {
    query = `query JobQuery {
      jobs {
      id
      title
      company {
        id
        name
          }
        }
    }`;
  }
  const variables = id ? { jobId: id } : {};
  const data = await graphqlRequest(query, variables);
  return data;
}

export async function loadCompanies(id) {
  const query = `
    query CompanyQuery($id: ID!) {
      company(id: $id) {
      id
      name
      description
      jobs {
        id
        title 
      }
      }
    }
  `;
  let data;
  try {
    data = await graphqlRequest(query, { id });
  } catch (error) {
    console.log(error);
  }
  return data;
}

export async function createJob(payload) {
  const mutation = `
    mutation CreateJob($args: CreateJobInput) {
      job: createJob(args: $args) {
        id
        title
        description
      }
    }
  `;
  let data;
  try {
    data = await graphqlRequest(mutation, {
      args: payload,
    });
  } catch (error) {
    console.log({ error });
  }
  return data.job;
}
