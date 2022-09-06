import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import Message from './Message';


const AddProjectModal = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState('new');

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data:{projects:[...projects, addProject]}
      })
    }
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);



  const submitHandler = e => {
    e.preventDefault();
    if (name === '' || description === '' || status === '') {
      return alert('Please fill in all fields')
    };
    addProject();
    setName('')
    setDescription('')
    setStatus('new')
    setClientId('')
  }
  
  if (loading) return null;
  if (error) return <Message>{error.message}</Message>

  return (
    <>
      {
        !loading && !error &&
        (
          <>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
<FaList className='icon' />Add Project
</button>


<div className="modal fade" id="addProjectModal"  aria-labelledby="addProjectModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
              <h5 className="modal-title" id="addProjectModalLabel">
               
                Add Project</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
              <form onSubmit={submitHandler}>
                <div className='mb-3'>
                  <label htmlFor='name' className='form-label'>Name</label>
                  <input
                    id='name'
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className='form-control'
                    
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='description' className='form-label'>Description</label>
                  <textarea
                    id='description'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className='form-control'
                  ></textarea>
                </div>
                <div className='mb-3'>
                  <label htmlFor='status' className='form-label'>Status</label>
                  <select
                    id='status'
                    className='form-select'
                    value={status}
                    onChange={e=>setStatus(e.target.value)}
                  >
                    <option value='new'>Not Started</option>
                    <option value='progress'>In Progress</option>
                    <option value='completed'>Completed</option>
                  </select>
                      </div>
                      <div className='mb-3'>
                        <label htmlFor='client' className='form-label'>Client</label>
                        <select
                          className='form-select'
                          id='clientId'
                          value={clientId}
                          onChange={e=>setClientId(e.target.value)}
                        >
                          <option value=''>Select Client</option>
                          {
                            data.clients.map(client => (
                              <option
                                key={client.id}
                                value={client.id}
                              >{client.name}</option>
                            ))
                          }
                        </select>
                      </div>
                <button type='submit' className='btn btn-sm btn-primary' data-bs-dismiss='modal'>Submit</button>
      </form>
      </div>
    </div>
  </div>
      </div>
          </>
        )
      }

      </>
  )
}

export default AddProjectModal