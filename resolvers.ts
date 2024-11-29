import { Collection } from "mongodb";
import { Flight, FlightModel } from "./types.ts";
import { getFlightFromModel } from "./utils.ts";
import { ObjectId } from "mongodb";

export const resolvers = {
	Query: {
		getFlights: async (
			_: unknown,
			__: unknown,
			context: { flightsCollection: Collection<FlightModel> }
		): Promise<Flight[]> => {
			const flighModels: FlightModel[] = await context.flightsCollection
				.find()
				.toArray();
			const flights: Flight[] = flighModels.map((f) => getFlightFromModel(f));
			return flights;
		},
		getFlight: async (
			_: unknown,
			{ id }: { id: string },
			context: { flightsCollection: Collection<FlightModel> }
		): Promise<Flight | null> => {
			const flightModel: FlightModel | null =
				await context.flightsCollection.findOne({ _id: new ObjectId(id) });
			if (!flightModel) {
				return null;
			}
			return getFlightFromModel(flightModel);
		},
	},
	Mutation: {
		addFlight: async (
			_: unknown,
			args: { origin: string; destiny: string; dateAndTime: string },
			context: { flightsCollection: Collection<FlightModel> }
		): Promise<Flight> => {
			const { origin, destiny, dateAndTime } = args;
			const { insertedId } = await context.flightsCollection.insertOne({
				origin,
				destiny,
				dateAndTime,
			});
			const flightModel: FlightModel = {
				_id: insertedId,
				origin,
				destiny,
				dateAndTime,
			};
			return getFlightFromModel(flightModel);
		},
	},
};
