import { MongoClient } from "mongodb";
import { FlightModel } from "./types.ts";
import { ApolloServer } from "npm:@apollo/server@^4.1";
import { schema } from "./schema.ts";
import { resolvers } from "./resolvers.ts";
import { startStandaloneServer } from "npm:@apollo/server/standalone";

const MONGO_URL = Deno.env.get("MONGO_URL");
if (!MONGO_URL) {
	console.error("Environment variable MONGO_URL not defined");
	Deno.exit(1);
}

const client = new MongoClient(MONGO_URL);
await client.connect();
console.info("Connected to MongoDB (￣︶￣*))");

const db = client.db("Airline");
const flightsCollection = db.collection<FlightModel>("flights");

const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
});

const { url } = await startStandaloneServer(server, {
	context: async () => ({ flightsCollection }),
});

console.info(`Server ready at ${url}`);
