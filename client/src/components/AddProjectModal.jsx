import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";

export default function AddProjectModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const [clientId, setClientId] = useState("");

  // Get Clients for select form.
  const { loading, error, data } = useQuery(GET_CLIENTS);

  //   const [addClient] = useMutation(ADD_CLIENT, {
  //     variables: { name: name, email: email, phone: phone },
  //     update(cache, { data: { addClient } }) {
  //       const { clients } = cache.readQuery({ query: GET_CLIENTS });
  //       cache.writeQuery({
  //         query: GET_CLIENTS,
  //         data: {
  //           //clients is an array. use concat on array containing the addClient obj (data) to add onto clients array.
  //           clients: clients.concat([addClient]),
  //           //clients: [...clients, addClient],
  //         },
  //       });
  //     },
  //   });

  const onSubmit = (e) => {
    // prevent default
    e.preventDefault();
    // check to make sure form is filled with values
    if (name === "" || description === "" || status === "") {
      return alert("Please fill in all fields to continue.");
    }
    // run graphQL mutation
    // addClient(name, email, phone);
    // reset state values
    setName("");
    setDescription("");
    setStatus("new");
    setClientId("");
  };

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong!</p>;

  return (
    <>
      {!loading && !error && (
        <>
          {/* <!-- Button trigger modal --> */}
          <button
            type="button"
            className="btn btn-dark"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>Add New Project</div>
            </div>
          </button>

          {/* <!-- Modal --> */}
          <div
            className="modal fade"
            id="addProjectModal"
            aria-labelledby="addClientModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addClientModalLabel">
                    New Project
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <form onSubmit={onSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        id="status"
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select
                        id="clientId"
                        className="form-select"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        <option value="">Select Client</option>
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-info"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>

                      <button
                        type="submit"
                        className="btn btn-info"
                        data-bs-dismiss="modal"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
