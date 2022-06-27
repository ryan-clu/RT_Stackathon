import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { FaTrash } from "react-icons/fa";

export default function DeleteProjectButton({ projectId }) {
  // cannot use useNavigate inside of the useMutation below to deleteProject
  const navigate = useNavigate();

  const [DeleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => {
      navigate("/");
    },
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2" onClick={DeleteProject}>
        <FaTrash className="icon" /> Delete Project
      </button>
    </div>
  );
}

/*
NOTES: 

- useNavigate is a hook from react-router-dom that we use to redirect to the home page.

*/
