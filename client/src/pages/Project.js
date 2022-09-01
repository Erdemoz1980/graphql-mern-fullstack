import { GET_PROJECT } from "../queries/projectQueries";
import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

const Project = () => {
  const { id } = useParams();


  const { loading, error, data } = useQuery(GET_PROJECT,
    { variables: { id } });
  const { project: { id: projectId, name, description, status } } = data;
   

  if (loading) return <Spinner />
  if (error) return <Message variant='danger'>{error.message}</Message>

  return (
    <>
    <div>Project</div>
      <div>{name}</div>
      </>
  )
}

export default Project