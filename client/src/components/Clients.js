import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from '../queries/clientQueries';
import Spinner from './Spinner';
import Message from "./Message";
import ClientRow from "./ClientRow";


const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  
  if (loading) return <Spinner />;
  if (error) return <Message variant={'danger'}>
    Something went wrong</Message>

  return (
    <table className="table table-hover mb-3">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
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