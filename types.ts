import { OptionalId } from "mongodb";

export type FlightModel = OptionalId<{
	origin: string;
	destiny: string;
	dateAndTime: string;
}>;

export type Flight = {
	id: string;
	origin: string;
	destiny: string;
	dateAndTime: string;
};
