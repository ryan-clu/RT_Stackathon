import { useQuery } from "@apollo/client";
import ClientRow from './ClientRow';
import Spinner from "./Spinner";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />
  if (error) return <p>Something went wrong!</p>;

  return <>{!loading && !error && (
		<table className="table table-hover mt-3">
			<thead>
				<tr>
					<th>Name</th>
					<th>Email</th>
					<th>Phone</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{data.clients.map((client) => (
					<ClientRow key={client.id} client={client}/>
				))}
			</tbody>
		</table>
	)}</>;
}

/*
NOTES

- gql allows us to make graphql queries. 
- useQuery is an Apollo hook that allows us to use the data  from  our graphql queries in our components, as well as get loadingstate and any errors.

- ApolloClient & ApolloProvider is kind of like its own state manager. Apollo is our state manager in this app.
- If we were using REST API we would need to use context API or Redux.

- For updating the cache in Apollo Client, when we write over the existing cache query data (for lets say clients or projects),
cache data may be lost during replacment of the clients field or projects field of a Query object.
- To address this problem, we define a custom merge function for the Query.clients and Query.projects field, so 
InMemoryCache can safely merge these objects.

*/
