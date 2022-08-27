import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from './queries/clientQueries';
import Spinner from './Spinner';
import ClientRow from "./ClientRow";


const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something went very very wrong! Run!</p>

  return (
    <table className='table table-hover mt-3'>
      <thead>
        <tr>
          <td>Name</td>
          <td>Email</td>
          <td>Phone</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {
          !loading && !error && (
            data.clients.map(client => (
              <ClientRow key={client.id} client={client} />
            ))
          )
        }
      </tbody>
    </table>
  )
}

export default Clients