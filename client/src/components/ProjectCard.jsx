export default function ProjectCard({ project }) {
  return (
    <div className="col-md-6">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            {/* Name */}
            <h5 className="card-title">{project.name}</h5>
            {/* Button that links to project's single view project page */}
            <a className="btn btn-info" href={`/projects/${project.id}`}>
              View
            </a>
          </div>
          {/* Project Status */}
          <p className="small mt-2 mb-2">
            Status: <strong>{project.status}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
