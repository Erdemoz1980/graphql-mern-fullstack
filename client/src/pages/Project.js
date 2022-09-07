import { useQuery } from "@apollo/client";
import { useParams, Link } from 'react-router-dom';
import { GET_PROJECT } from '../queries/projectQueries';
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from '../components/EditProjectForm';


const Project = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id }
  });

  if (loading) return <Spinner />
  if (error) return <Message variant='danger'>
    {error.message}</Message>
  
  const { project, project: { id:projectId, name, description, status, client } } = data;
  

  return (
    <>
      {
        !loading && !error && (
          <div className=" w-75 card p-5">
            <Link to='/' className="btn btn-secondary btn-sm w-25 d-inline ms-auto">Go Back</Link>
            <h1>{name}</h1>
            <p>{description}</p>
            <h5 className="mt-3">Project Status</h5>
            <p className="lead"
             style={{color:`${status==='Completed' ? 'red' : 'black'}`, fontWeight:`${status==='Completed' ? 'bold' : 'normal'}`}}
            >{status}</p>
            {client && <ClientInfo client={client} />}
            <EditProjectForm project={project} />
            <DeleteProjectButton projectId={projectId} />

          </div>
        )
      }
      
    </>
  )
}

export default Project