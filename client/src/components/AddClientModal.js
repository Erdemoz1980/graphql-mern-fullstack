import { FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { useMutation } from '@apollo/client';
import Message from './Message';


const AddClientModal = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient }  }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] }
      });
     
    }
  });


  const submitHandler = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || phone === '') {
      return <Message variant='danger'>Please fill in all fields</Message>
    } else {
      addClient(name, email, phone);
      setName('');
      setEmail('');
      setPhone('');
    }
   
  };


  return (
    <>
      <button type="button" className="btn btn-secondary mb-3 " data-bs-toggle="modal" data-bs-target="#addClientModal">
        <div className='d-flex align-items-center'>
          <FaUser className='icon' />
          <div className='m-1'>Add Client</div>
        </div>
      </button>

      <div className="modal fade" id="addClientModal" aria-labelledby="addClientModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">Add Client</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={submitHandler} >
                <div className='mb-3'>
                  <label className='form-label'>Name</label>
                  <input
                    className='form-control'
                    type='text'
                    id='name'
                    value={name}
                    onChange={e=>setName(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Email</label>
                  <input
                    className='form-control'
                    type='email'
                    id='email'
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Phone</label>
                  <input
                    className='form-control'
                    type='text'
                    id='phone'
                    value={phone}
                    onChange={e=>setPhone(e.target.value)}
                  />
                </div>
                <button
                type='submit'
                  className='btn btn-primary'
                  data-bs-dismiss='modal'
                >Submit</button>
              </form>
            </div>
           
          </div>
        </div>
      </div>
    </>
  )
};

export default AddClientModal