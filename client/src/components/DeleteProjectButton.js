import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import { DELETE_PROJECT } from '../mutations/projectMutations';


const DeleteProjectButton = ({ projectId }) => {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    refetchQueries:[{query:GET_PROJECTS}],
    onCompleted:()=>navigate('/')
  });

  const deleteHandler = () => {
    deleteProject();
 
  }


  return (
    <div className='d-flex mt-5 ms-auto'>
      <button
        onClick={deleteHandler}
        className='btn btn-danger m-2'>
        <FaTrash className='icon' />
        Delete Project
      </button>
    </div>
  )
}

export default DeleteProjectButton