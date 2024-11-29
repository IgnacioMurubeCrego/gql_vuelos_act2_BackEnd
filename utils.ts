import { Flight, FlightModel } from "./types.ts";

export const getFlightFromModel = (flightModel: FlightModel): Flight => {
	return {
		id: flightModel._id!.toString(),
		origin: flightModel.origin,
		destiny: flightModel.destiny,
		dateAndTime: flightModel.dateAndTime,
	};
};
