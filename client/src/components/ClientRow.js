import { DELETE_CLIENT } from './mutations/clientMutations';
import { GET_CLIENTS } from './queries/clientQueries';
import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';


const ClientRow = ({ client }) => {
  const { name, email, phone } = client;
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }]
  });

  
  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <button className='btn btn-sm btn-danger' onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  )
}

export default ClientRow