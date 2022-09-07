import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from '../mutations/projectMutations';


const EditProjectForm = ({project}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    setName(project.name);
    setDescription(project.description)
  
  }, [project.name, project.status, project.description])
  

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables:{id:project.id} }]
  });


  const updateProjectHandler = e => {
    e.preventDefault()
    updateProject();
  }

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={updateProjectHandler}>
        <div className='mt-3'>
          <label htmlFor="name" className="input-label">Name</label>
          <input
            id='name'
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            className='form-control'
          />
        </div>
        <div className="mt-3">
          <label htmlFor="description" className='form-label'>Description</label>
          <textarea
            value={description}
            id='description'
            className="form-control"
            onChange={e=>setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className='mt-3'>
          <label htmlFor="status" className="form-label">Status</label>
          <select
          required
            value={status}
            onChange={e=>setStatus(e.target.value)}
            className='form-control'
          >
            <option value='' defaultValue>Select One...</option>
            <option value='new'>Not Started</option>
            <option value='progress'>In Progress</option>
            <option value='completed'>Completed</option>
          </select>
        </div>

      
        <button
          type='submit'
          className="btn btn-sm btn-primary mt-3"
        >Update</button>
      </form>
    </div>
  )
}

export default EditProjectForm