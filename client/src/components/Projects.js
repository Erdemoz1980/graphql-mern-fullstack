import Spinner from './Spinner';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import Message from './Message';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />
  if (error) return <Message variant='danger'>Something went wrong</Message>

  return (
    <>
      {
        data.projects.length > 0 ? (
          <div className='row'>
            {data.projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
           </div>
        ) : <div>No Projects to show</div>
    }
    </>
  )
}

export default Projects