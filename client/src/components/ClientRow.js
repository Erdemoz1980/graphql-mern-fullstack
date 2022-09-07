import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';

const ClientRow = ({ client }) => {
  const { name, email, phone } = client;
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries:[{query:GET_CLIENTS},{query:GET_PROJECTS}]
  });

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <button
          onClick={deleteClient}
          className='btn btn-sm btn-danger'>
          <FaTrash />
        </button>
      </td>
    </tr>
  )
}

export default ClientRow