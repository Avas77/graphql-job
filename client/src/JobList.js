import React, { Component } from "react";
import { Link } from "react-router-dom";

export class JobList extends Component {
  render() {
    const { jobs } = this.props;
    if (!jobs) return <p>You need to login to view jobs</p>;
    return <ul className="box">{jobs.map(this.renderJob.bind(this))}</ul>;
  }

  renderJob(job) {
    const title = job.company
      ? `${job.title} at ${job.company.name}`
      : job.title;
    return (
      <li className="media" key={job.id}>
        <div className="media-content">
          <Link to={`/jobs/${job.id}`}>{title}</Link>
        </div>
      </li>
    );
  }
}
