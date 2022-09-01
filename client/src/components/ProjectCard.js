import React from 'react'

const ProjectCard = ({ project }) => {
  const { id, clientId, name, description, status } = project;

  return (
    <div className='col-md-4'>
      <div className='card mb-3' style={{cursor:'pointer'}}>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center'>
            <h5 className='card-title'>{name}</h5>
            <a className='btn btn-light' href={`/project/${id}`}>Details</a>
          </div>
          <p className='small'>
            Status: <strong>{status}</strong>
           </p>
        </div>
      </div>
  
    </div>
  )
};

export default ProjectCard